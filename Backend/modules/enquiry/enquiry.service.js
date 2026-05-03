const ApiError = require('../../utils/ApiError');
const nodemailer = require('nodemailer');
const enquiryRepository = require('./enquiry.repository');

const getEnquiries = async () => {
  return await enquiryRepository.findAllEnquiries();
};

const createEnquiry = async (enquiryData) => {
  const newEnquiry = await enquiryRepository.createEnquiry(enquiryData);

  // Send email to admin
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== "your-gmail@gmail.com") {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to admin info@bharatyatratravels.com
      subject: `New Travel Enquiry from ${enquiryData.name}`,
      text: `You have received a new enquiry from your website:\n\n` +
            `👤 Name: ${enquiryData.name}\n` +
            `📧 Email: ${enquiryData.email}\n` +
            `📞 Phone: ${enquiryData.phone || 'N/A'}\n` +
            `📝 Subject: ${enquiryData.subject || 'N/A'}\n\n` +
            `💬 Message:\n${enquiryData.message}\n\n` +
            `--- End of Enquiry ---`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending enquiry email:', error.message);
      } else {
        console.log('Enquiry email sent successfully:', info.response);
      }
    });
  } else {
    console.warn('Enquiry email not sent: Email credentials not configured or using placeholders in .env');
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
