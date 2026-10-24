const express = require('express');
const router  = express.Router();
const shopController = require('../controllers/shopController');

// GET /shop          →  serve shop.html
router.get('/', shopController.getShop);

// GET /shop/api      →  return all products as JSON
// Supports query params: ?category=Men  ?sort=price-asc | price-desc
router.get('/api', shopController.getProductsJson);

module.exports = router;
