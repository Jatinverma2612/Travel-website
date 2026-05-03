const sendEmail = require('../../utils/sendEmail');
const enquiryRepository = require('./enquiry.repository');

const getEnquiries = async () => {
  return await enquiryRepository.findAllEnquiries();
};

const createEnquiry = async (enquiryData) => {
  const newEnquiry = await enquiryRepository.createEnquiry(enquiryData);

  // Send email to admin via Resend
  await sendEmail({
    to: process.env.EMAIL_USER || 'info@bharatyatratravels.com',
    subject: `New Travel Enquiry from ${enquiryData.name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb;">New Travel Enquiry</h2>
        <p>You have received a new enquiry from your website:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📧 Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📞 Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📝 Subject:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.subject || 'N/A'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
          <strong>💬 Message:</strong><br/>
          ${enquiryData.message.replace(/\n/g, '<br/>')}
        </div>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">
          --- End of Enquiry ---
        </p>
      </div>
    `
  });

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
