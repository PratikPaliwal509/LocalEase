const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
  generated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  report_type: {
    type: String,
    enum: ['order', 'user_growth', 'revenue', 'vendor_performance'],
    required: true
  },
  report_data: mongoose.Schema.Types.Mixed, // JSON field
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);