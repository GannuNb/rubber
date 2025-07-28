const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER;      // Your Hostinger email address
const EMAIL_PASS = process.env.EMAIL_PASS;      // Your Hostinger email password
const EMAIL_USER_GAN = process.env.ADMIN_EMAIL; // Admin/recipient email

// POST /api/contact - no authentication
router.post('/', async (req, res) => {
  const { name, email, phone, tour, message } = req.body;
  
  try {
    // Save contact to DB
    const contact = new Contact({
      name,
      email,
      phone,
      tour,
      message,
    });
    await contact.save();

    // Hostinger SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER_GAN,
      subject: `New contact form submission: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTour: ${tour}\nMessage: ${message}`,
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

module.exports = router;
