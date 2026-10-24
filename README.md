# STRYDRA — Shoe Shop

A full-structure Express.js shoe shop with a professional frontend.

## Setup

```bash
cd prac
npm install
npm run dev      # uses nodemon, auto-restarts on changes
# or
npm start        # plain node
```

Then open → http://localhost:3000

## Project map

| Path | What it does |
|---|---|
| `app.js` | Express entry point — middleware, routes, server |
| `routes/` | One file per page — wires URLs to controllers |
| `controllers/` | Logic layer — serves HTML or returns JSON |
| `data/products.json` | Product data — replace with a real DB later |
| `middleware/logger.js` | Logs every request to the console |
| `utils/formatPrice.js` | `$94.99` formatter — import anywhere |
| `views/` | HTML pages (served via `res.sendFile`) |
| `public/css/` | Stylesheets — `global.css` + one per page |
| `public/js/` | Frontend JS — fetches from your API, renders UI |

## API endpoints

| Method | URL | Returns |
|---|---|---|
| GET | `/shop/api` | All products (JSON) |
| GET | `/shop/api?category=Running` | Filtered by category |
| GET | `/shop/api?sort=price-asc` | Sorted |
| GET | `/product/api/:id` | Single product (JSON) |

## Pages

| URL | Page |
|---|---|
| `/` | Home — hero + featured 4 |
| `/shop` | All products with filter + sort |
| `/product?id=1` | Single product detail |
| `/cart` | Cart with order summary |

## Wiring up your backend

**Products:** Edit `controllers/shopController.js` and `productController.js`
to read from a database instead of `products.json`.

**Cart:** Currently stored in `localStorage` (frontend).
When you add server-side cart logic, update `getCart`/`saveCart`
in `public/js/cart.js` to use `fetch()` calls instead.

**Checkout:** The Checkout button in `views/cart.html` calls `alert()`.
Replace that with a `fetch('/your-order-route', { method: 'POST', ... })`.
