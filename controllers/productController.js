const path     = require('path');
const products = require('../data/products.json');

exports.getProduct = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/product.html'));
};

// GET /product/api/:id
exports.getProductJson = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};
