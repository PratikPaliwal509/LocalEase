
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  status: {
    type: String,
    enum: ['placed', 'processing', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'],
    default: 'placed'
  },
  total_price: mongoose.Types.Decimal128,
  delivery_address: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
});

const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: Number,
  price_at_purchase: mongoose.Types.Decimal128,
});

module.exports = {
  Order: mongoose.model('Order', orderSchema),
  OrderItem: mongoose.model('OrderItem', orderItemSchema),
};
