const prisma = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }

    // Check if admin exists
    const adminExists = await prisma.admin.findUnique({ where: { email } });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (admin) {
      res.status(201).json({
        id: admin.id,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        id: admin.id,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.adminId;

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedNewPassword },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Generate token
    const resetToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.json({ 
      message: 'Reset token generated in response for demo. In production, this should be sent via email.', 
      resetToken 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  changePassword,
  forgotPassword
};
