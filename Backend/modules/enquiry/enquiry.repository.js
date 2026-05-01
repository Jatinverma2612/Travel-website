const prisma = require('../../config/db');

const findAllEnquiries = async () => {
  return await prisma.enquiry.findMany({
    orderBy: { created_at: 'desc' },
  });
};

const findEnquiryById = async (id) => {
  return await prisma.enquiry.findUnique({ where: { id } });
};

const createEnquiry = async (data) => {
  return await prisma.enquiry.create({ data });
};

const deleteEnquiry = async (id) => {
  return await prisma.enquiry.delete({ where: { id } });
};

module.exports = {
  findAllEnquiries,
  findEnquiryById,
  createEnquiry,
  deleteEnquiry,
};
