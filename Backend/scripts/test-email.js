/**
 * EMAIL TEST SCRIPT
 * Run: node scripts/test-email.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('Host:', process.env.EMAIL_HOST || 'smtp.hostinger.com');
  console.log('Port:', process.env.EMAIL_PORT || 465);
  console.log('User:', process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: parseInt(process.env.EMAIL_PORT) === 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add logging to see what happens
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'SMTP Test - Bharat Yaatra Travels',
    text: 'If you see this, your SMTP settings are working perfectly!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email.');
    console.error('Error Message:', error.message);
    if (error.code === 'EAUTH') {
      console.error('Hint: This is an Authentication error. Check your password!');
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.error('Hint: This is a Connection error. Hostinger might be blocking the port or your domain is not verified.');
    }
  }
}

testEmail();
