/**
 * formatPrice.js
 * Formats a number as a PKR price string.
 *
 * @param {number} amount
 * @returns {string}  e.g. "PKR 4,950"
 */
function formatPrice(amount) {
  return `PKR ${Number(amount).toLocaleString('en-PK')}`;
}

module.exports = { formatPrice };
