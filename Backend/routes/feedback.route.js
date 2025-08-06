const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.model'); // Adjust path if needed
const Product = require('../models/product.model');
const Vendor = require('../models/vendor.model');

// 🔹 1. Add Feedback
router.post('/feedback', async (req, res) => {
  try {
    const { user, vendor, product, rating, review, complaint } = req.body;

    // Optional: Check if product/vendor exists
    const prodExists = await Product.findById(product);
    const vendorExists = await Vendor.findById(vendor);
    if (!prodExists || !vendorExists) {
      return res.status(404).json({ error: 'Product or Vendor not found' });
    }

    const feedback = new Feedback({
      user,
      vendor,
      product,
      rating,
      review,
      complaint
    });

    const saved = await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 2. Get all feedback for a product
router.get('/feedback/product/:productId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ product: req.params.productId }).populate('user');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 3. Get all feedback for a vendor
router.get('/feedback/vendor/:vendorId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ vendor: req.params.vendorId }).populate('user product');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 4. Get all feedback by a user
router.get('/feedback/user/:userId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.params.userId }).populate('product vendor');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 5. Delete a feedback (by ID)
router.delete('/feedback/:feedbackId', async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.feedbackId);
    if (!deleted) return res.status(404).json({ error: 'Feedback not found' });

    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 6. Update feedback (optional)
router.put('/feedback/:feedbackId', async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Feedback not found' });

    res.json({ message: 'Feedback updated', feedback: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
