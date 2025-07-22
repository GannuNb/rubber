const mongoose = require('mongoose');

const lotAmountSchema = new mongoose.Schema({
  companyName: String,
  lotNumber: String,
  amount: Number
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('LotAmount', lotAmountSchema);
