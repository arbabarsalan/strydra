/**
 * formatPrice.js
 * Formats a number as a USD price string.
 *
 * @param {number} amount
 * @returns {string}  e.g. "$94.99"
 */
function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

module.exports = { formatPrice };
