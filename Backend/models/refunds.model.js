const mongoose = require('mongoose');
const refundSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: String,
  status: {
    type: String,
    enum: ['requested', 'approved', 'rejected', 'refunded'],
    default: 'requested'
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Refund', refundSchema);