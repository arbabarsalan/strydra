/**
 * shop.js  —  Handles category filters, sort, and product grid
 * on the /shop page.
 */

let activeCategory = 'all';
let activeSort     = '';

function buildProductCard(product) {
  const oos  = !product.inStock;
  const card = document.createElement('a');
  card.href  = `/product?id=${product.id}`;
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-card__thumb">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      ${oos
        ? '<span class="product-card__badge product-card__badge--oos">Out of Stock</span>'
        : ''}
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

async function loadProducts() {
  const grid  = document.getElementById('shop-grid');
  const count = document.getElementById('result-count');

  grid.innerHTML = '<div class="loading">Loading…</div>';

  const params = new URLSearchParams();
  if (activeCategory !== 'all') params.set('category', activeCategory);
  if (activeSort)               params.set('sort', activeSort);

  try {
    const res      = await fetch(`/shop/api?${params}`);
    const products = await res.json();

    count.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    grid.innerHTML    = '';

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🧵</div>
          <h3>No items found</h3>
          <p>Try a different category or clear your filters.</p>
        </div>
      `;
      return;
    }

    products.forEach(p => grid.appendChild(buildProductCard(p)));
  } catch (err) {
    grid.innerHTML = '<div class="error-state">Failed to load products.</div>';
    console.error(err);
  }
}

function initFilters() {
  // Pre-select category from URL query param
  const urlCat = new URLSearchParams(window.location.search).get('category');
  if (urlCat) {
    activeCategory = urlCat;
    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === urlCat);
    });
  }

  // Category chips
  document.getElementById('cat-filters').addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.dataset.cat;
    loadProducts();
  });

  // Sort dropdown
  document.getElementById('sort-select').addEventListener('change', e => {
    activeSort = e.target.value;
    loadProducts();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  loadProducts();
});
