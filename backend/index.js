const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const supplierRoutes = require('./routes/supplierRoutes');
const lotRoutes = require('./routes/lotRoutes'); // Routes for lots
const authRoutes = require('./routes/authRoutes');
const app = express(); // Initialize express app

// Middlewares
app.use(cors());               // Enable CORS for cross-origin requests
app.use(express.json());       // Parse incoming JSON payloads

// Routes
app.use('/api/suppliers', supplierRoutes); // All supplier routes under /api/suppliers
app.use('/api/lots', lotRoutes); 
app.use('/api/auth', authRoutes);          // All lot-related routes under /api/lots

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
