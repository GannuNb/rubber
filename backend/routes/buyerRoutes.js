// routes/BuyerRoutes.js
const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

// Create new Buyer
router.post('/add', async (req, res) => {
  try {
    const newBuyer = new Buyer(req.body); // Use full formData directly
    await newBuyer.save(); // Correct: call .save() on the instance
    res.status(201).json({ message: 'Buyer added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add Buyer', details: error.message });
  }
});


// Get all Buyers
router.get('/all', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buyers' });
  }
});

module.exports = router;
