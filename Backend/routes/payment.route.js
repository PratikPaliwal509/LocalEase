const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.model'); // Adjust path
const Order = require('../models/order.model');     // Needed to validate order

// ✅ 1. Create a payment (POST /api/payments)
router.post('/payments', async (req, res) => {
  try {
    const { order, payment_method } = req.body;

    // Check if order exists
    const orderExists = await Order.findById(order);
    if (!orderExists) return res.status(404).json({ error: 'Order not found' });

    const payment = new Payment({ order, payment_method });
    const savedPayment = await payment.save();

    res.status(201).json({ message: 'Payment record created', payment: savedPayment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 2. Get a payment by ID (GET /api/payments/:paymentId)
router.get('/payments/:paymentId', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId).populate('order');
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 3. Get all payments for an order (GET /api/payments/order/:orderId)
router.get('/payments/order/:orderId', async (req, res) => {
  try {
    const payments = await Payment.find({ order: req.params.orderId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 4. Update payment status (PUT /api/payments/:paymentId)
router.put('/payments/:paymentId', async (req, res) => {
  try {
    const { payment_status } = req.body;

    if (!['pending', 'paid', 'failed'].includes(payment_status)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { payment_status, payment_date: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) return res.status(404).json({ error: 'Payment not found' });

    res.json({ message: 'Payment status updated', payment: updatedPayment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 5. Delete a payment record (DELETE /api/payments/:paymentId)
router.delete('/payments/:paymentId', async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.paymentId);
    if (!deleted) return res.status(404).json({ error: 'Payment not found' });

    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
