const express = require('express');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const router = express.Router();

router.post('/add-to-cart/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send('Product not found');

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id });
  }

  const existingItem = cart.items.find(item => item.product.toString() === product._id.toString());
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: product._id, quantity: 1 });
  }

  await cart.save();
  req.flash('success_message', 'Product added to cart');
  res.redirect('/');
});

module.exports = router;
