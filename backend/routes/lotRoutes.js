const express = require('express');
const router = express.Router();

const Lot = require('../models/Lot'); // For fetching and adding lots
const LotDetails = require('../models/LotDetails'); // Container entries
const LotAmount = require('../models/LotAmount');   // Amount entries

// =============== LOT ===================

// Add a new Lot (companyName, lotNumber, pricePerTon)
router.post('/add', async (req, res) => {
  try {
    const { companyName, lotNumber, price } = req.body;

    const existing = await Lot.findOne({ companyName, lotNumber });
    if (existing) {
      return res.status(400).json({ error: 'Lot already exists' });
    }

    const lot = new Lot({ companyName, lotNumber, price });
    await lot.save();
    res.status(201).json(lot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all lots
router.get('/all', async (req, res) => {
  try {
    const lots = await Lot.find();
    res.json(lots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============== LOT DETAILS (Container Info) ===================

// Add container details
router.post('/details/add', async (req, res) => {
  try {
    const detail = new LotDetails(req.body);
    await detail.save();
    res.status(201).json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all container details
router.get('/details/all', async (req, res) => {
  try {
    const details = await LotDetails.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============== LOT AMOUNTS ===================

// Add amount entry (payment)
// routes/lots.js
router.post('/amounts/add', async (req, res) => {
  try {
    const { companyName, lotNumber, amount, date } = req.body;

    const newAmount = new LotAmount({
      companyName,
      lotNumber,
      amount,
      date: new Date(date), // Store selected date
    });

    await newAmount.save();
    res.status(201).json(newAmount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all amount entries
router.get('/amounts/all', async (req, res) => {
  try {
    const amounts = await LotAmount.find();
    res.json(amounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
