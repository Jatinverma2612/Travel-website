const ApiError = require('../../utils/ApiError');
const nodemailer = require('nodemailer');
const enquiryRepository = require('./enquiry.repository');

const getEnquiries = async () => {
  return await enquiryRepository.findAllEnquiries();
};

const createEnquiry = async (enquiryData) => {
  const newEnquiry = await enquiryRepository.createEnquiry(enquiryData);

  // Send email to admin
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to admin
      subject: `New Enquiry from ${enquiryData.name}: ${enquiryData.subject || 'No Subject'}`,
      text: `You have received a new enquiry.\n\nName: ${enquiryData.name}\nEmail: ${enquiryData.email}\nPhone: ${enquiryData.phone || 'N/A'}\nSubject: ${enquiryData.subject || 'N/A'}\n\nMessage:\n${enquiryData.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } else {
    console.warn('Email credentials not configured in .env');
  }

  return newEnquiry;
};

const deleteEnquiry = async (id) => {
  const enquiry = await enquiryRepository.findEnquiryById(Number(id));

  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }

  await enquiryRepository.deleteEnquiry(Number(id));
};

module.exports = {
  getEnquiries,
  createEnquiry,
  deleteEnquiry,
};
