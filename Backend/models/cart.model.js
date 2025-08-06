const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: Number,
});

module.exports = {
  Cart: mongoose.model('Cart', cartSchema),
  CartItem: mongoose.model('CartItem', cartItemSchema),
};
