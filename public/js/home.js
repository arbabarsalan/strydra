/**
 * home.js  —  Fetches first 4 products from the API and renders
 * them in the featured grid on the home page.
 */

function buildProductCard(product) {
  const oos = !product.inStock;
  const card = document.createElement('a');
  card.href  = `/product?id=${product.id}`;
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-card__thumb">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      ${oos
        ? '<span class="product-card__badge product-card__badge--oos">Out of Stock</span>'
        : '<span class="product-card__badge">New</span>'}
    </div>
    <div class="product-card__info">
      <div class="product-card__cat">${product.category}</div>
      <div class="product-card__name">${product.name}</div>
      <div class="product-card__footer">
        <span class="product-card__price">PKR ${product.price.toLocaleString('en-PK')}</span>
        <span class="product-card__arrow">→</span>
      </div>
    </div>
  `;
  return card;
}

async function loadFeatured() {
  const grid = document.getElementById('featured-grid');
  try {
    const res      = await fetch('/shop/api');
    const products = await res.json();
    const featured = products.slice(0, 4);

    grid.innerHTML = '';
    featured.forEach(p => grid.appendChild(buildProductCard(p)));
  } catch (err) {
    grid.innerHTML = '<div class="error-state">Could not load products.</div>';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeatured);
