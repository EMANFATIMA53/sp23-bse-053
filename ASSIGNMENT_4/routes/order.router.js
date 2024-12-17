const express = require('express');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const router = express.Router();

router.post('/place-order', async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    req.flash('error_message', 'Your cart is empty');
    return res.redirect('/');
  }

  const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const order = new Order({
    user: req.user._id,
    items: cart.items,
    totalPrice,
    paymentMethod: 'cash',
  });

  await order.save();
  cart.items = []; // Empty the cart after order placement
  await cart.save();

  req.flash('success_message', 'Order placed successfully');
  res.redirect('/orders');
});

router.get('/orders', ensureAuthenticated, isAdmin, async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.render('admin/orders', { orders });
});

module.exports = router;
