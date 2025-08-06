const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  payment_method: { type: String, enum: ['card', 'upi', 'cod'], required: true },
  payment_status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  payment_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);