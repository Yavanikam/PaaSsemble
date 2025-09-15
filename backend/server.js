const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const QRCode = require('qrcode');

const Payment = require('./models/Payment'); // Adjust the path if needed

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: 'https://paassemble.onrender.com', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Routes
const authRoutes = require('./router/authRoutes');
const userRoutes = require('./router/userRoutes');
const eventRoutes = require('./router/eventRoutes');
const paymentRoutes = require('./router/paymentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payments', paymentRoutes);

// Fallback Route (must be after API routes)
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend', 'home-index.html'));
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
