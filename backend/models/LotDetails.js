const mongoose = require('mongoose');

const lotDetailSchema = new mongoose.Schema({
  companyName: String,
  lotNumber: String,
  containerNo: String,
  sealNo: String,
  material: String,
  quantity: String,
  price: Number
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('LotDetail', lotDetailSchema);
