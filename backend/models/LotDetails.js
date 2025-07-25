const mongoose = require('mongoose');

const lotDetailSchema = new mongoose.Schema({
  companyName: String,
  lotNumber: String,
  containerNo: String,
  sealNo: String,
  material: String,
  quantity: String,
  price: Number,
  date: Date  // ⬅️ Add this line
}, {
  timestamps: true
});

module.exports = mongoose.model('LotDetail', lotDetailSchema);
