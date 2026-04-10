const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getBookings,
  createBooking,
  updateBookingStatus,
} = require('../controllers/booking.controller');

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.route('/:id')
  .put(protect, updateBookingStatus);

module.exports = router;
