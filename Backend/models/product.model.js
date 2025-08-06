const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: mongoose.Types.Decimal128, required: true },
  stock_quantity: Number,
  is_active: { type: Boolean, default: true },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
