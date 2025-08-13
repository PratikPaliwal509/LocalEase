const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models/cart.model'); // adjust path
const Product = require('../models/product.model'); // needed for validation

// 🔹 Add product to cart (POST /api/cart/add)
router.post('/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Step 1: Validate product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Step 2: Find or create cart for user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
      await cart.save();
    }

    // Step 3: Check if product already in cart
    let cartItem = await CartItem.findOne({ cart: cart._id, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({
        cart: cart._id,
        product: productId,
        quantity,
      });
    }

    await cartItem.save();
    res.status(200).json({ message: 'Product added to cart', cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get products in user’s cart (GET /api/cart/:userId)
router.get('/cart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const cartItems = await CartItem.find({ cart: cart._id }).populate('product');
    res.json({ cart, items: cartItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Remove product from cart (DELETE /api/cart/:userId/remove/:productId)
router.delete('/cart/:userId/remove/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const deletedItem = await CartItem.findOneAndDelete({
      cart: cart._id,
      product: productId,
    });

    if (!deletedItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    res.json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
