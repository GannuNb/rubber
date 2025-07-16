const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
  totalPaidAfter: Number,
  remainingBalanceAfter: Number,
});

const containerSchema = new mongoose.Schema({
  containerNumber: String,
  sealNumber: String,
  material: String,
  quantity: Number,
  pricePerTon: Number,
  totalAmount: Number,
  totalPaidAtThatTime: Number,
  remainingBalanceAtThatTime: Number,
  date: { type: Date, default: Date.now },
});

const supplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  advancePayment: Number,
  totalPaid: Number,
  remainingBalance: Number,
  advanceHistory: [advanceSchema],
  containers: [containerSchema],
});

module.exports = mongoose.model('Supplier', supplierSchema);
