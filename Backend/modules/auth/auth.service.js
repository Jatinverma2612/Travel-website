const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');
const authRepository = require('./auth.repository');

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

const registerAdmin = async ({ email, password }) => {
  const adminExists = await authRepository.findAdminByEmail(email);
  if (adminExists) {
    throw new ApiError(400, 'Admin already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await authRepository.createAdmin({
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin.id);

  return {
    admin: { id: admin.id, email: admin.email },
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

  // Generate token
  const resetToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  return resetToken;
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changePassword,
  forgotPassword,
};
