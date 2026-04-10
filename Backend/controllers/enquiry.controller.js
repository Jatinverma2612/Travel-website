const prisma = require('../config/db');
const nodemailer = require('nodemailer');

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // Send email to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to admin
        subject: `New Enquiry from ${name}: ${subject || 'No Subject'}`,
        text: `You have received a new enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
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

    res.status(201).json(newEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const enquiry = await prisma.enquiry.findUnique({ where: { id } });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    await prisma.enquiry.delete({ where: { id } });

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEnquiries,
  createEnquiry,
  deleteEnquiry
};
