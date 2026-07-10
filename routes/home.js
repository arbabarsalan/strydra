const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/homeController');

// GET /  →  serve the home page
router.get('/', homeController.getHome);

module.exports = router;
