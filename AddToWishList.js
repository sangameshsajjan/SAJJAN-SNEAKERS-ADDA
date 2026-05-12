// AddToWishList page JavaScript
// Manages wishlist display, removal, and moving items to cart
const currentUser = JSON.parse(localStorage.getItem("sneakerUser"));

if(!currentUser || !currentUser.loggedIn){

  window.location.href = "../LoginPage/login.html";
}
const cartKey = "sneakerCart";
const wishlistKey = "sneakerWishlist";
const wishlistContainer = document.getElementById("wishlist-items");
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

// Remove item from wishlist
function removeFromWishlist(productId) {
  const wishlist = getStorage(wishlistKey).filter(
    (item) => item.id !== productId,
  );
  setStorage(wishlistKey, wishlist);
  renderWishlist();
  updateCounts();
}



// Move item from wishlist to cart
function moveToCart(productId) {
  const wishlist = getStorage(wishlistKey);
  const product = wishlist.find((item) => item.id === productId);
  const cart = getStorage(cartKey);
  if (!product) return;
  if (!cart.some((item) => item.id === productId)) {
    cart.push(product);
    setStorage(cartKey, cart);
  }
  removeFromWishlist(productId);
}



// Render the wishlist items
function renderWishlist() {
  const wishlist = getStorage(wishlistKey);
  wishlistContainer.innerHTML = "";

  if (!wishlist.length) {
    wishlistContainer.innerHTML =
      '<div class="empty-state"><p>Your wishlist is empty. Save your favorite sneakers from the homepage.</p></div>';
    return;
  }

  wishlist.forEach((item) => {
    const card = document.createElement("div");
    card.className = "wishlist-card";
    card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="wishlist-info">
                <h3>${item.name}</h3>
                <p>${item.description || "Must-have streetwear sneaker"}</p>
                <div class="wishlist-row">
                    <span class="wishlist-price">${formatPrice(item.price)}</span>
                    <div>
                        <button class="btn-action btn-add-cart">Move to Cart</button>
                        <button class="btn-action btn-remove">Remove</button>
                    </div>
                </div>
            </div>
        `;
    const [moveButton, removeButton] = card.querySelectorAll("button");
    moveButton.addEventListener("click", () => moveToCart(item.id));
    removeButton.addEventListener("click", () => removeFromWishlist(item.id));
    wishlistContainer.appendChild(card);
  });
}

updateCounts();
renderWishlist();
