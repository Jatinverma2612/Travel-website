const enquiryService = require('./enquiry.service');
const catchAsync = require('../../utils/catchAsync');

const getEnquiries = catchAsync(async (req, res) => {
  const enquiries = await enquiryService.getEnquiries();
  res.status(200).json(enquiries);
});

const createEnquiry = catchAsync(async (req, res) => {
  const newEnquiry = await enquiryService.createEnquiry(req.body);
  res.status(201).json(newEnquiry);
});

const deleteEnquiry = catchAsync(async (req, res) => {
  await enquiryService.deleteEnquiry(req.params.id);
  res.status(200).json({ message: 'Enquiry deleted successfully' });
});

module.exports = {
  getEnquiries,
  createEnquiry,
  deleteEnquiry,
};
