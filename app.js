const express = require('express');
const path    = require('path');

const logger    = require('./middleware/logger');
const homeRoute = require('./routes/home');
const shopRoute = require('./routes/shop');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Core middleware ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// ── Page + API routes ──────────────────────────────────────────────────────────
// Each router handles its own page (GET /) and its own JSON data (GET /api or /api/:id)
app.use('/',        homeRoute);
app.use('/shop',    shopRoute);
app.use('/product', productRoute);
app.use('/cart',    cartRoute);

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send('<h2>404 — Page not found</h2><a href="/">Go home</a>');
});

app.listen(PORT, () => {
  console.log(`\n  STRYDRA is running → http://localhost:${PORT}\n`);
});

module.exports = app;
