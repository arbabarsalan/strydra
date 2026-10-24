/**
 * cart.js  —  shared across all pages
 *
 * Cart is stored in localStorage as an array of:
 *   { productId, name, price, image, size, qty }
 *
 * When you wire up a backend, replace getCart/saveCart with
 * fetch() calls to your cart API. Keep function names the same
 * and nothing else needs to change.
 */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('stride_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('stride_cart', JSON.stringify(cart));
  refreshCartCount();
}

function addToCart(item) {
  // item = { productId, name, price, image, size, qty }
  const cart     = getCart();
  const existing = cart.find(i => i.productId === item.productId && i.size === item.size);

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

function updateQty(productId, size, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId && i.size === size);
  if (!item) return;
  if (newQty <= 0) {
    removeFromCart(productId, size);
    return;
  }
  item.qty = newQty;
  saveCart(cart);
}

function removeFromCart(productId, size) {
  const cart = getCart().filter(
    i => !(i.productId === productId && i.size === size)
  );
  saveCart(cart);
}

function cartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function refreshCartCount() {
  const cart  = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = total;
  });
}

// Run on every page load
document.addEventListener('DOMContentLoaded', refreshCartCount);
