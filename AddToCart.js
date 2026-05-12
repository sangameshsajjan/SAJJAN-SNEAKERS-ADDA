// AddToCart page JavaScript
// Manages cart display, removal, and checkout navigation
const currentUser = JSON.parse(localStorage.getItem("sneakerUser"));

if(!currentUser || !currentUser.loggedIn){

  window.location.href = "../LoginPage/login.html";
}
const cartKey = "sneakerCart";
const wishlistKey = "sneakerWishlist";
const cartItemsContainer = document.getElementById("cart-items");
const cartSummaryContainer = document.getElementById("cart-summary");
const cartCountEl = document.getElementById("cart-count");
const wishlistCountEl = document.getElementById("wishlist-count");

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

// Remove item from cart
function removeFromCart(productId) {
  const cart = getStorage(cartKey).filter((item) => item.id !== productId);
  setStorage(cartKey, cart);
  renderCart();
  updateCounts();
}


// Render the cart items and summary
function renderCart() {
  const cart = getStorage(cartKey);
  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    cartItemsContainer.innerHTML =
      '<div class="empty-state"><p>Your cart is empty. Add sneakers from the homepage to start building your order.</p></div>';
    cartSummaryContainer.innerHTML = "";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const card = document.createElement("div");
    card.className = "cart-card";
    card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>${item.description || "Favorite sneaker pick"}</p>
                <div class="cart-row">
                    <span class="cart-price">${formatPrice(item.price)}</span>
                    <button class="btn-action btn-remove">Remove</button>
                </div>
            </div>
        `;
    const removeButton = card.querySelector("button");
    removeButton.addEventListener("click", () => removeFromCart(item.id));
    cartItemsContainer.appendChild(card);
  });

  cartSummaryContainer.innerHTML = `
        <div>
            <p>Total items: <strong>${cart.length}</strong></p>
            <p>Review your cart and continue to checkout.</p>
        </div>
        <div>
            <p>Total</p>
            <strong>${formatPrice(total)}</strong>
        </div>
        <a href="../BuyWebpage/BuyPage.html" class="btn-action btn-checkout">Checkout</a>
    `;
}

updateCounts();
renderCart();
