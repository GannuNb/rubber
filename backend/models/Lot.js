const mongoose = require('mongoose');

const lotSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  lotNumber: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Lot', lotSchema);
