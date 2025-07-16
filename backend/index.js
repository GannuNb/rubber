const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
  const supplierRoutes = require('./routes/supplierRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));


  app.use('/api/auth', authRoutes);

app.use('/api/suppliers', supplierRoutes);