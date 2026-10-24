/**
 * product.js  —  Fetches a single product from /product/api/:id
 * and renders the full detail page content.
 */

let selectedSize = null;
let qty          = 1;
let product      = null;

function switchImage(src) {
  document.getElementById('main-img').src = src;
  document.querySelectorAll('.gallery__thumb').forEach(t => {
    t.classList.toggle('active', t.querySelector('img').src === src);
  });
}

function setQty(newQty) {
  qty = Math.max(1, newQty);
  document.getElementById('qty-display').textContent = qty;
}

function renderProduct(p) {
  product = p;

  // breadcrumb
  document.getElementById('breadcrumb-name').textContent = p.name;
  document.title = `${p.name} — LIBAS`;

  const inStock = p.inStock;

  document.getElementById('product-root').innerHTML = `
    <!-- Gallery -->
    <div class="gallery">
      <div class="gallery__main">
        <img id="main-img" src="${p.images[0]}" alt="${p.name}" />
      </div>
      <div class="gallery__thumbs" id="thumbs">
        ${p.images.map((img, i) => `
          <div class="gallery__thumb ${i === 0 ? 'active' : ''}">
            <img src="${img}" alt="${p.name} view ${i + 1}" />
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Info -->
    <div class="product-info">
      <div class="product-info__cat">${p.category}</div>
      <h1 class="product-info__name">${p.name}</h1>
      <div class="product-info__price">PKR ${p.price.toLocaleString('en-PK')}</div>

      <div class="stock-badge ${inStock ? '' : 'stock-badge--oos'}">
        ${inStock ? 'In Stock — Ships in 2–4 days' : 'Out of Stock'}
      </div>

      <p class="product-info__desc">${p.description}</p>

      ${inStock ? `
        <!-- Size picker -->
        <div class="size-picker__label">
          <span>Size</span>
          <a href="#">Size guide</a>
        </div>
        <div class="size-grid" id="size-grid">
          ${p.sizes.map(s => `
            <button class="size-btn" data-size="${s}">${s}</button>
          `).join('')}
        </div>

        <!-- Qty + Add -->
        <div class="purchase-row">
          <div class="qty-control">
            <button id="qty-minus">−</button>
            <span id="qty-display">1</span>
            <button id="qty-plus">+</button>
          </div>
          <button class="btn btn--accent btn--full" id="add-btn">Add to Cart</button>
        </div>
        <div class="add-msg" id="add-msg"></div>
      ` : `
        <button class="btn btn--outline btn--full" disabled style="opacity:0.5;cursor:not-allowed;">
          Out of Stock
        </button>
      `}
    </div>
  `;

  // Thumb switcher
  document.querySelectorAll('.gallery__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      switchImage(thumb.querySelector('img').src);
    });
  });

  if (!inStock) return;

  // Size buttons
  document.getElementById('size-grid').addEventListener('click', e => {
    const btn = e.target.closest('.size-btn');
    if (!btn) return;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
    document.getElementById('add-msg').textContent = '';
  });

  // Quantity
  document.getElementById('qty-minus').addEventListener('click', () => setQty(qty - 1));
  document.getElementById('qty-plus').addEventListener('click', () => setQty(qty + 1));

  // Add to cart
  document.getElementById('add-btn').addEventListener('click', () => {
    const msg = document.getElementById('add-msg');
    if (!selectedSize) {
      msg.textContent = 'Please select a size.';
      return;
    }
    addToCart({
      productId: p.id,
      name:      p.name,
      price:     p.price,
      image:     p.images[0],
      size:      selectedSize,
      qty
    });
    const btn    = document.getElementById('add-btn');
    btn.textContent = '✓ Added to Cart';
    setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
    msg.textContent = '';
  });
}

async function loadProduct() {
  const id   = new URLSearchParams(window.location.search).get('id');
  const root = document.getElementById('product-root');

  if (!id) {
    root.innerHTML = '<div class="error-state">No product ID in URL. Add <code>?id=1</code>.</div>';
    return;
  }

  try {
    const res = await fetch(`/product/api/${id}`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    renderProduct(data);
  } catch (err) {
    root.innerHTML = `
      <div class="error-state" style="grid-column:1/-1">
        Product not found. <a href="/shop">Back to shop</a>
      </div>
    `;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadProduct);
