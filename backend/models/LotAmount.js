// models/LotAmount.js
const mongoose = require('mongoose');

const lotAmountSchema = new mongoose.Schema({
  companyName: String,
  lotNumber: String,
  amount: Number,
  date: Date, // <-- Custom date field for manual selection
}, {
  timestamps: true // Still keeps createdAt and updatedAt
});

module.exports = mongoose.model('LotAmount', lotAmountSchema);
