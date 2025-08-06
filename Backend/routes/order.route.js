const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models/order.model'); // adjust path if needed
const Product = require('../models/product.model');

// 🔹 1. Place a new order
router.post('/orders', async (req, res) => {
  try {
    const { user, vendor, items, delivery_address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    let total_price = 0;

    // Validate products & calculate total
    const validItems = await Promise.all(items.map(async item => {
      const product = await Product.findById(item.product);
      if (!product || product.stock_quantity < item.quantity) {
        throw new Error(`Product not available or out of stock: ${item.product}`);
      }

      const itemTotal = parseFloat(product.price.toString()) * item.quantity;
      total_price += itemTotal;

      // Optional: Decrease stock
      product.stock_quantity -= item.quantity;
      await product.save();

      return {
        product: product._id,
        quantity: item.quantity,
        price_at_purchase: product.price,
      };
    }));

    const order = new Order({
      user,
      vendor,
      total_price,
      delivery_address,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedOrder = await order.save();

    // Save order items
    for (const item of validItems) {
      const orderItem = new OrderItem({
        order: savedOrder._id,
        ...item
      });
      await orderItem.save();
    }

    res.status(201).json({ message: 'Order placed successfully', orderId: savedOrder._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 2. Get all orders of a user
router.get('/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ created_at: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 3. Get one order with its items
router.get('/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user vendor');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const items = await OrderItem.find({ order: order._id }).populate('product');

    res.json({ order, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 4. Update order status (PUT /orders/:orderId/status)
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['placed', 'processing', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Order not found' });

    res.json({ message: 'Order status updated', order: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 5. Cancel Order (only if not yet delivered)
router.put('/orders/:orderId/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status === 'delivered') return res.status(400).json({ error: 'Cannot cancel delivered order' });

    order.status = 'cancelled';
    order.updated_at = new Date();
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 6. Delete an order (optional - use cautiously)
router.delete('/orders/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    await OrderItem.deleteMany({ order: req.params.orderId });

    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });

    res.json({ message: 'Order and associated items deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
