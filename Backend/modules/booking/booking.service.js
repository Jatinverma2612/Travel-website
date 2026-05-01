const ApiError = require('../../utils/ApiError');
const bookingRepository = require('./booking.repository');

const getBookings = async () => {
  return await bookingRepository.findAllBookings();
};

const createBooking = async (bookingData) => {
  return await bookingRepository.createBooking({
    ...bookingData,
    status: 'pending',
  });
};

const updateBookingStatus = async (id, status) => {
  const booking = await bookingRepository.findBookingById(Number(id));

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  return await bookingRepository.updateBooking(Number(id), { status });
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
};
