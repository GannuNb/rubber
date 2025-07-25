// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Supplier = require('../models/Supplier');

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// POST /api/suppliers/add
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const supplierData = {
      ...req.body,
      userId: req.user.id,
      person: 'supplier'
    };

    const existing = await Supplier.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(409).json({ message: 'Profile already exists' });
    }

    const newSupplier = new Supplier(supplierData);
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier profile created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add supplier', details: err.message });
  }
});

// GET /api/suppliers/my-profile
router.get('/my-profile', authenticateToken, async (req, res) => {
  try {
    const profile = await Supplier.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'No profile found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile', details: err.message });
  }
});

module.exports = router;
