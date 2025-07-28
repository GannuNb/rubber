const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // userId removed or optional, since no login/auth now
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  tour: { type: String },        // optional, can be empty
  message: { type: String, required: true }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

module.exports = mongoose.model('Contact', contactSchema);
