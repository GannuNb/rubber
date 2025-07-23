const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  website: { type: String },
  gst: { type: String },
  vat: { type: String }
});

module.exports = mongoose.model('Buyer', buyerSchema);
