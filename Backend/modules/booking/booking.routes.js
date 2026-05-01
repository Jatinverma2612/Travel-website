const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const { createBookingSchema, updateBookingStatusSchema } = require('./booking.validation');
const bookingController = require('./booking.controller');

router.route('/')
  .get(protect, bookingController.getBookings)
  .post(validate(createBookingSchema), bookingController.createBooking);

router.route('/:id')
  .put(protect, validate(updateBookingStatusSchema), bookingController.updateBookingStatus);

module.exports = router;
