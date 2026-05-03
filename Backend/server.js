require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

// Import routes
const authRoutes = require('./modules/auth/auth.routes');
const packageRoutes = require('./modules/package/package.routes');
const bookingRoutes = require('./modules/booking/booking.routes');
const enquiryRoutes = require('./modules/enquiry/enquiry.routes');
const reviewRoutes = require('./modules/review/review.routes');
const galleryRoutes = require('./modules/gallery/gallery.routes');

const errorHandler = require('./middleware/error.middleware');

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows images to be loaded cross-origin
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Standard Middleware
app.use(cors({
  origin:[
    "http://localhost:3000",
    "https://bharatyatratravels.com",
    "https://www.bharatyatratravels.com"
  ],
  credentials: true
}));

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parses cookies

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Bharat Yatra Travels API is running...');
});

// Testing backend 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});

// Centralized Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
