const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key_here'; // Store this in .env in real apps

const Vendor = require('../models/vendor.model'); 
// Import your vendor model
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role,mobile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword)
    const newUser = new User({ name, email, password: hashedPassword, role, mobile });
    await newUser.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
