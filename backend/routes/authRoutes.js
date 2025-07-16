const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET is not set in environment variables!');
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log('[SIGNUP] Received:', { name, email, phone });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`[SIGNUP] User with email ${email} already exists`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(`[SIGNUP] User created: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('[SIGNUP ERROR]:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('[LOGIN] Attempt:', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`[LOGIN] No user found with email: ${email}`);
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[LOGIN] Password mismatch for user: ${email}`);
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (!JWT_SECRET) {
      console.error('[LOGIN ERROR] JWT_SECRET is not defined!');
      return res.status(500).json({ message: 'Server error: missing JWT secret' });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[LOGIN] Success for user: ${email}`);
    res.json({ message: 'Login successful', token });
  } catch (e) {
    console.error('[LOGIN ERROR]:', e);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// GET /api/auth/userprofile
router.get('/userprofile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('[USERPROFILE ERROR]:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.put('/userprofile', authenticateToken, async (req, res) => {
  const updateData = {};

  // Only allow these fields
  const allowedFields = ['name', 'email', 'phone'];

  allowedFields.forEach(field => {
    if (req.body[field]) {
      updateData[field] = req.body[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: updatedUser, message: 'Profile updated successfully' });
  } catch (err) {
    console.error('[UPDATE USERPROFILE ERROR]:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




module.exports = router;
