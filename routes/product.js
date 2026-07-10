const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController');

// GET /product          →  serve product.html (JS reads ?id= from URL)
router.get('/', productController.getProduct);

// GET /product/api/:id  →  return single product as JSON
router.get('/api/:id', productController.getProductJson);

module.exports = router;
