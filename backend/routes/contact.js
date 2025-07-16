const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_USER_GAN = process.env.EMAIL_USER_GAN;

// Middleware to authenticate token from Authorization header
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = payload; 
    next();
  });
};

// POST /api/contact
router.post('/', authenticate, async (req, res) => {
  const { name, email, phone, tour, message } = req.body;
  try {
    const contact = new Contact({
      userId: req.user.id,
      name,
      email,
      phone,
      tour,
      message
    });
    await contact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER_GAN,
      subject: `New contact form submission: ${name}`,
      text: `User (${req.user.email}, ID: ${req.user.id}) submitted:\n
Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTour: ${tour}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email error:', err);
        return res.status(500).json({ message: 'Contact saved, but email failed' });
      }
      res.status(200).json({ message: 'Contact saved and email sent' });
    });
  } catch (e) {
    console.error('Contact POST error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contact/mycontacts - Get contact submissions for logged-in user
router.get('/mycontacts', authenticate, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
