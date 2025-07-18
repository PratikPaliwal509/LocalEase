const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key_here'; // Store this in .env in real apps

const Vendor = require('../models/vendor.model'); 
// Import your vendor model
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['buyer', 'vendor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, password: hashedPassword, role });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (buyer/vendor/admin)
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user) return res.status(400).json({ message: 'Invalid email or role' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Admin login route
router.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/vendors/update-details', async (req, res) => {
  try {
    const { userId, shop_name, business_license, shop_location } = req.body;

    // Check if user exists and is a vendor
    const user = await User.findById(userId);
    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can update shop details' });
    }

    let vendor = await Vendor.findOne({ user_id: userId });

    if (vendor) {
      // Update existing vendor
      vendor.shop_name = shop_name;
      vendor.business_license = business_license;
      vendor.shop_location = shop_location;
      await vendor.save();
    } else {
      // Create new vendor document
      vendor = new Vendor({
        user_id: userId,
        shop_name,
        business_license,
        shop_location,
        approval_status: 'pending',
      });
      await vendor.save();
    }

    res.json({ message: 'Vendor details updated successfully', vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
