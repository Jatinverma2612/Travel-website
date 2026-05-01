const prisma = require('../../config/db');

const findAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      package: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

const findBookingById = async (id) => {
  return await prisma.booking.findUnique({ where: { id } });
};

const createBooking = async (data) => {
  return await prisma.booking.create({ data });
};

const updateBooking = async (id, data) => {
  return await prisma.booking.update({
    where: { id },
    data,
  });
};

module.exports = {
  findAllBookings,
  findBookingById,
  createBooking,
  updateBooking,
};
