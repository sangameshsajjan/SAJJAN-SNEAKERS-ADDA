// BuyPage (Checkout) JavaScript
// Handles checkout summary, order placement, and cart clearing
const currentUser = JSON.parse(localStorage.getItem("sneakerUser"));

if(!currentUser || !currentUser.loggedIn){

  window.location.href = "../LoginPage/login.html";
}
const cartKey = "sneakerCart";
const checkoutSummary = document.getElementById("checkout-summary");
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

// Update cart and wishlist counts in the header
function updateCounts() {
  cartCountEl.textContent = getStorage(cartKey).length;
  wishlistCountEl.textContent = getStorage("sneakerWishlist").length;
}

// Format price from cents to dollars
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

// Simulate placing an order
function placeOrder() {
  setStorage(cartKey, []);
  checkoutSummary.innerHTML =
    '<div class="empty-state"><p>Thank you for your purchase! Your cart is now empty.</p><p><a class="btn-action" href="../landingWebpage/index.html">Back to Home</a></p></div>';
  updateCounts();
}



// Render the checkout summary
function renderCheckout() {
  const cart = getStorage(cartKey);
  updateCounts();

  if (!cart.length) {
    checkoutSummary.innerHTML =
      '<div class="empty-state"><p>Your cart is empty. Add items from the homepage before checking out.</p></div>';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  checkoutSummary.innerHTML = `
        ${cart
          .map(
            (item) => `
            <div class="order-item">
                <h3>${item.name}</h3>
                <span>${formatPrice(item.price)}</span>
            </div>
        `,
          )
          .join("")}
        <div class="order-total">
            <span>Order Total</span>
            <strong>${formatPrice(total)}</strong>
        </div>
        <button class="btn-action" id="place-order">Place Order</button>
    `;
  document.getElementById("place-order").addEventListener("click", placeOrder);
}

renderCheckout();
