const path = require('path');

exports.getCart = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/cart.html'));
};
