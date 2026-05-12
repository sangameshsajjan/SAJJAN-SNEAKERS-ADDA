// Landing page JavaScript for Sneaker Ecommerce
// Handles product loading, search, pagination, cart/wishlist management
const currentUser = JSON.parse(localStorage.getItem("sneakerUser"));

if(!currentUser || !currentUser.loggedIn){

  window.location.href = "../LoginPage/login.html";
}
const cartKey = "sneakerCart";
const wishlistKey = "sneakerWishlist";
const productGrid = document.getElementById("product-grid");
const cartCountEl = document.getElementById("cart-count");
const wishlistCountEl = document.getElementById("wishlist-count");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const paginationContainer = document.getElementById("pagination");
const pageInfo = document.getElementById("page-info");

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const pageSize = 6;

// Fallback products in case db.json fails to load
const fallbackProducts = [
  {
    id: 218099,
    name: "Air Jordan 1 Retro High OG 'Shadow'",
    price: 16000,
    description: "Black and grey leather with classic high-top style.",
    image:
      "https://image.goat.com/750/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
    brand: "Air Jordan",
    color: "Black",
    category: "basketball",
  },
  {
    id: 507844,
    name: "Air Jordan 4 Retro OG GS 'Bred'",
    price: 14000,
    description: "Signature black and red colorway with powerful silhouettes.",
    image:
      "https://image.goat.com/750/attachments/product_template_pictures/images/020/806/444/original/507844_00.png.png",
    brand: "Air Jordan",
    color: "Black",
    category: "basketball",
  },
  {
    id: 52015,
    name: "Air Jordan 11 Retro 'Space Jam'",
    price: 22000,
    description: "Shiny black patent leather inspired by the movie legend.",
    image:
      "https://image.goat.com/750/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png",
    brand: "Air Jordan",
    color: "Black",
    category: "basketball",
  },
  {
    id: 13607,
    name: "Air Jordan 11 Retro 'Legend Blue'",
    price: 20000,
    description: "White leather and blue details for a clean finish.",
    image:
      "https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
    brand: "Air Jordan",
    color: "White",
    category: "basketball",
  },
];

// Utility functions for localStorage
function getStorage(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Format price from cents to dollars
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

// Update cart and wishlist counts in the header
function updateCounts() {
  cartCountEl.textContent = getStorage(cartKey).length;
  wishlistCountEl.textContent = getStorage(wishlistKey).length;
}

// Show a temporary toast message
function showMessage(text) {
  const message = document.createElement("div");
  message.className = "toast-message";
  message.textContent = text;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 1800);
}

// Process raw sneaker data into a standardized format
function processSneaker(item) {
  const description =
    item.details ||
    item.story_html ||
    item.nickname ||
    "Popular sneaker model.";
  const image =
    item.main_picture_url ||
    item.grid_picture_url ||
    item.original_picture_url ||
    "https://images.unsplash.com/photo-1519741493405-447e5dffc7c9?auto=format&fit=crop&w=900&q=80";

  return {
    id: item.id,
    name: item.name,
    price: item.retail_price_cents || 0,
    description: stripHTML(description).slice(0, 110),
    image,
    brand: item.brand_name || "",
    color: item.color || "",
    category: Array.isArray(item.category)
      ? item.category.join(" ")
      : item.category || "",
  };
}


// Strip HTML tags from text
function stripHTML(html) {
  const container = document.createElement("div");
  container.innerHTML = html || "";
  return container.textContent.trim();
}

// Load products from db.json or use fallback
function loadProducts() {
  fetch("../data/db.json")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data?.sneakers) && data.sneakers.length) {
        allProducts = data.sneakers.map(processSneaker);
      } else {
        allProducts = fallbackProducts;
      }
      filteredProducts = allProducts;
      currentPage = 1;
      renderProducts();
      renderPagination();
      updateCounts();
    })
    .catch(() => {
      console.warn("Could not load db.json, using fallback products.");
      allProducts = fallbackProducts;
      filteredProducts = allProducts;
      currentPage = 1;
      renderProducts();
      renderPagination();
      updateCounts();
    });
}



// Add product to cart or wishlist
function addProduct(product, key, successText) {
  const current = getStorage(key);
  if (current.some((item) => item.id === product.id)) {
    showMessage(successText.replace("Added", "Already added"));
    return;
  }
  current.push(product);
  setStorage(key, current);
  updateCounts();
  showMessage(successText);
}



// Pagination helpers
function getPageCount() {
  return Math.max(1, Math.ceil(filteredProducts.length / pageSize));
}

function getCurrentPageProducts() {
  const start = (currentPage - 1) * pageSize;
  return filteredProducts.slice(start, start + pageSize);
}

// Render product grid
function renderProducts() {
  productGrid.innerHTML = "";
  const pageProducts = getCurrentPageProducts();

  if (!pageProducts.length) {
    productGrid.innerHTML =
      '<div class="empty-state"><p>No products matched your search. Try another keyword.</p></div>';
    pageInfo.textContent = `Showing 0 products.`;
    return;
  }

  pageProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-details">
          <span class="product-price">${formatPrice(product.price)}</span>
          <div class="product-actions">
            <button class="btn-cart" data-action="cart">Add to Cart</button>
            <button class="btn-wishlist" data-action="wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>
    `;

    const buttons = card.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.action === "cart") {
          addProduct(product, cartKey, "Added to cart");
        } else {
          addProduct(product, wishlistKey, "Added to wishlist");
        }
      });
    });

    productGrid.appendChild(card);
  });

  const start = (currentPage - 1) * pageSize + 1;
  const end = start + pageProducts.length - 1;
  pageInfo.textContent = `Showing ${start}–${end} of ${filteredProducts.length} products`;
}

function renderPagination() {
  const pageCount = getPageCount();
  paginationContainer.innerHTML = "";

  if (pageCount <= 1) {
    return;
  }

  const prevButton = document.createElement("button");
  prevButton.className = "pagination-button";
  prevButton.textContent = "Prev";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderProducts();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let page = 1; page <= pageCount; page += 1) {
    const pageButton = document.createElement("button");
    pageButton.className = "pagination-button";
    pageButton.textContent = page;
    if (page === currentPage) {
      pageButton.classList.add("active");
      pageButton.disabled = true;
    }
    pageButton.addEventListener("click", () => {
      currentPage = page;
      renderProducts();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.className = "pagination-button";
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === pageCount;
  nextButton.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage += 1;
      renderProducts();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  paginationContainer.appendChild(nextButton);
}

function handleSearch(event) {
  if (event) event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();

  filteredProducts = allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.color.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  currentPage = 1;
  renderProducts();
  renderPagination();
}

searchForm.addEventListener("submit", handleSearch);
searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    filteredProducts = allProducts;
    currentPage = 1;
    renderProducts();
    renderPagination();
  }
});

updateCounts();
loadProducts();
