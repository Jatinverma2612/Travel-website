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
      port: 587,
      secure: false, // Use STARTTLS for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Helps avoid connection issues on some hosts
      }
    });

    const mailOptions = {
      from: `"Bharat Yatra Travels" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sending to admin
      subject: `New Travel Enquiry from ${enquiryData.name}`,
      text: `You have received a new enquiry from your website:\n\n` +
            `👤 Name: ${enquiryData.name}\n` +
            `📧 Email: ${enquiryData.email}\n` +
            `📞 Phone: ${enquiryData.phone || 'N/A'}\n` +
            `📝 Subject: ${enquiryData.subject || 'N/A'}\n\n` +
            `💬 Message:\n${enquiryData.message}\n\n` +
            `--- End of Enquiry ---`,
    };

    try {
      console.log(`[DEBUG] Attempting to send enquiry email from ${process.env.EMAIL_USER}...`);
      const info = await transporter.sendMail(mailOptions);
      console.log('[DEBUG] Enquiry email sent successfully:', info.response);
    } catch (error) {
      console.error('[DEBUG] Error sending enquiry email:', error);
      // We don't throw here to avoid failing the DB record creation, but we log the error
    }
  } else {
    console.warn('[DEBUG] Enquiry email skipped: Credentials missing or using placeholders.');
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
