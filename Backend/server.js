require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth.routes');
const packageRoutes = require('./routes/package.routes');
const bookingRoutes = require('./routes/booking.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const reviewRoutes = require('./routes/review.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/reviews', reviewRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Bharat Yaatra Travels API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
