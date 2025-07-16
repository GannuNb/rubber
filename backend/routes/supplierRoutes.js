const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Register or fetch supplier
router.post('/add', async (req, res) => {
  const { companyName, advancePayment } = req.body;
  let supplier = await Supplier.findOne({ companyName });

  if (supplier) return res.json(supplier);

  const newSupplier = new Supplier({
    companyName,
    advancePayment,
    totalPaid: advancePayment,
    remainingBalance: advancePayment,
    advanceHistory: [{
      amount: advancePayment,
      totalPaidAfter: advancePayment,
      remainingBalanceAfter: advancePayment,
      date: new Date()
    }],
    containers: []
  });

  supplier = await newSupplier.save();
  res.json(supplier);
});

// Fetch all suppliers
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find({}, 'companyName');
  res.json(suppliers);
});

// Fetch one supplier
router.get('/:companyName', async (req, res) => {
  const supplier = await Supplier.findOne({ companyName: req.params.companyName });
  if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
  res.json(supplier);
});

// Add container
router.post('/add-container/:companyName', async (req, res) => {
  const { containerNumber, sealNumber, material, quantity, pricePerTon } = req.body;
  const supplier = await Supplier.findOne({ companyName: req.params.companyName });
  if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

  const totalAmount = quantity * pricePerTon;
  const remaining = supplier.remainingBalance - totalAmount;

  supplier.remainingBalance = remaining;
  supplier.containers.push({
    containerNumber, sealNumber, material,
    quantity, pricePerTon, totalAmount,
    totalPaidAtThatTime: supplier.totalPaid,
    remainingBalanceAtThatTime: remaining,
    date: new Date()
  });

  await supplier.save();
  res.json(supplier);
});

// Add advance
router.post('/add-advance/:companyName', async (req, res) => {
  const { additionalAdvance } = req.body;
  const supplier = await Supplier.findOne({ companyName: req.params.companyName });
  if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

  supplier.totalPaid += additionalAdvance;
  supplier.remainingBalance += additionalAdvance;
  supplier.advanceHistory.push({
    amount: additionalAdvance,
    totalPaidAfter: supplier.totalPaid,
    remainingBalanceAfter: supplier.remainingBalance,
    date: new Date()
  });

  await supplier.save();
  res.json(supplier);
});

module.exports = router;
