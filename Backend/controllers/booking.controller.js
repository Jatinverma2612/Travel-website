const prisma = require('../config/db');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        package: true,
      },
      orderBy: { created_at: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { name, email, package_id, date } = req.body;

    const newBooking = await prisma.booking.create({
      data: {
        name,
        email,
        package_id: parseInt(package_id),
        date: new Date(date),
        status: 'pending',
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id = parseInt(req.params.id);

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
};
