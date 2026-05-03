const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');
const authRepository = require('./auth.repository');
const sendEmail = require('../../utils/sendEmail');

const generateAccessAndRefreshTokens = async (adminId) => {
  const accessToken = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ id: adminId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  await authRepository.updateAdmin(adminId, { refresh_token: refreshToken });

  return { accessToken, refreshToken };
};

const createAdmin = async ({ email, password }) => {
  // ONE-TIME ONLY CHECK
  const count = await authRepository.countAdmins();
  if (count > 0) {
    throw new ApiError(403, 'Admin already exists. Multiple admins are not allowed.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await authRepository.createAdmin({
    email,
    password: hashedPassword,
    role: "admin"
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin.id);

  return {
    admin: { id: admin.id, email: admin.email, role: admin.role },
    accessToken,
    refreshToken
  };
};

const loginAdmin = async ({ email, password }) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin.id);

  return {
    admin: { id: admin.id, email: admin.email },
    accessToken,
    refreshToken
  };
};

const logoutAdmin = async (adminId) => {
  await authRepository.updateAdmin(adminId, { refresh_token: null });
};

const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    
    const admin = await authRepository.findAdminById(decodedToken.id);

    if (!admin) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== admin.refresh_token) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin.id);
    
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
};

const changePassword = async (adminId, oldPassword, newPassword) => {
  const admin = await authRepository.findAdminById(adminId);

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid old password');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  await authRepository.updateAdmin(adminId, { password: hashedNewPassword });
};

const forgotPassword = async (email) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await authRepository.updateAdmin(admin.id, { resetOtp: otp, otpExpiry });

  // Send OTP via email
  await sendEmail({
    to: email,
    subject: 'Your Password Reset OTP - Bharat Yatra Travels',
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested a password reset for your Bharat Yatra Travels admin account. Use the OTP below to proceed. This OTP is valid for <strong>10 minutes</strong>.</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>If you did not request this, please ignore this email or contact support.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center;">
          Bharat Yatra Travels Admin Team
        </p>
      </div>
    `
  });

  return { message: 'OTP sent to email' };
};

const verifyOtp = async (email, otp) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  if (admin.resetOtp !== otp || !admin.otpExpiry || admin.otpExpiry < new Date()) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  return { message: 'OTP verified successfully' };
};

const resetPassword = async (email, newPassword) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  await authRepository.updateAdmin(admin.id, {
    password: hashedNewPassword,
    resetOtp: null,
    otpExpiry: null
  });

  return { message: 'Password reset successful' };
};

module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
