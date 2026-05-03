const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[EMAIL] Skipping email send: RESEND_API_KEY not found in environment.');
      return null;
    }

    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Bharat Yatra Travels <info@bharatyatratravels.com>', 
      to: to,
      subject: subject,
      html: html,
    });

    return data;
  } catch (error) {
    console.error('[EMAIL] Error:', error);
    return null;
  }
};

module.exports = sendEmail;
