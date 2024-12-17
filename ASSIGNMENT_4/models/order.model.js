const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: Number,
  paymentMethod: { type: String, default: 'cash' }, // Cash only
  status: { type: String, default: 'pending' }, // Pending, Completed
});

module.exports = mongoose.model('Order', OrderSchema);
