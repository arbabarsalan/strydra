const express = require('express');
const router  = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart  →  serve cart.html
router.get('/', cartController.getCart);

module.exports = router;
