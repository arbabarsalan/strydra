const path     = require('path');
const products = require('../data/products.json');

exports.getShop = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/shop.html'));
};

// GET /shop/api?category=Running&sort=price-asc
exports.getProductsJson = (req, res) => {
  const { category, sort } = req.query;
  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'name-asc')   result.sort((a, b) => a.name.localeCompare(b.name));

  res.json(result);
};
