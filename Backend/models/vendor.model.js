const mongoose = require('mongoose');

// const vendorSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
//   shop_name: { type: String, required: true },
//   business_license: { type: String, required: true },
//   shop_location: { type: String, required: true }, // or use GeoJSON for maps
//   approval_status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//   created_at: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Vendor', vendorSchema);
const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Add additional vendor-specific fields if needed
});

module.exports = mongoose.model('Vendor', vendorSchema);
