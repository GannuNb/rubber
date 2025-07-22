// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Create new supplier
router.post('/add', async (req, res) => {
  try {
    const { name, companyName, contact } = req.body;
    const newSupplier = new Supplier({ name, companyName, contact });
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add supplier', details: error.message });
  }
});

// Get all suppliers
router.get('/all', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

module.exports = router;
