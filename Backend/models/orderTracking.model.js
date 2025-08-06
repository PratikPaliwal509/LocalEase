const mongoose = require('mongoose');
const trackingSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  current_location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  status_message: { type: String },
  updated_at: { type: Date, default: Date.now },
});

trackingSchema.index({ current_location: '2dsphere' });

module.exports = mongoose.model('OrderTracking', trackingSchema);