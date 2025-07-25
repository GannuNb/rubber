// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  person: { type: String, default: 'supplier' },
  name: { type: String, required: true },
  companyName: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  website: { type: String },
  gst: { type: String },
  vat: { type: String }
});

module.exports = mongoose.model('Supplier', supplierSchema);
