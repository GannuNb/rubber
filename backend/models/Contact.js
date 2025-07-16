const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  phone: String,
  tour: String,
  message: String
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('Contact', contactSchema);
