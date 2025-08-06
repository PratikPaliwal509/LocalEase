const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  review: String,
  complaint: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);