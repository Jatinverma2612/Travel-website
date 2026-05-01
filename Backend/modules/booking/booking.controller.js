const bookingService = require('./booking.service');
const catchAsync = require('../../utils/catchAsync');

const getBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getBookings();
  res.status(200).json(bookings);
});

const createBooking = catchAsync(async (req, res) => {
  const newBooking = await bookingService.createBooking(req.body);
  res.status(201).json(newBooking);
});

const updateBookingStatus = catchAsync(async (req, res) => {
  const updatedBooking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
  res.status(200).json(updatedBooking);
});

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
};
