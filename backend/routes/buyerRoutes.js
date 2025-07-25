const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer');

// 🔐 Middleware: Authenticate token and extract user ID
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = user; // token must contain user ID as { id: user._id }
    next();
  });
};

// ➕ POST /api/buyers/add - Create a new buyer with user ID and person field
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const buyerData = {
      ...req.body,
      userId: req.user.id, // ⬅️ user ID from token
      person: 'buyer'       // ⬅️ default role
    };

    const newBuyer = new Buyer(buyerData);
    await newBuyer.save();

    res.status(201).json({ message: 'Buyer added successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add Buyer',
      details: error.message
    });
  }
});

// 📄 GET /api/buyers/all - Get all buyers (optional: restrict to admin later)
router.get('/all', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buyers' });
  }
});
// ✅ GET /api/buyers/my-profile - Get buyer profile for logged-in user
router.get('/my-profile', authenticateToken, async (req, res) => {
  try {
    const profile = await Buyer.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'No profile found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});


module.exports = router;
