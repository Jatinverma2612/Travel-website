const authService = require('./auth.service');
const catchAsync = require('../../utils/catchAsync');

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const createAdmin = catchAsync(async (req, res) => {
  const { admin, accessToken, refreshToken } = await authService.createAdmin(req.body);

  res.status(201)
    .cookie('refreshToken', refreshToken, options)
    .json({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      token: accessToken
    });
});

const login = catchAsync(async (req, res) => {
  const { admin, accessToken, refreshToken } = await authService.loginAdmin(req.body);

  res.status(200)
    .cookie('refreshToken', refreshToken, options)
    .json({
      id: admin.id,
      email: admin.email,
      token: accessToken
    });
});

const logout = catchAsync(async (req, res) => {
  await authService.logoutAdmin(req.adminId);

  res.status(200)
    .clearCookie('refreshToken', options)
    .json({ message: 'Admin logged out successfully' });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  const { accessToken, refreshToken } = await authService.refreshAccessToken(incomingRefreshToken);

  res.status(200)
    .cookie('refreshToken', refreshToken, options)
    .json({ token: accessToken });
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  await authService.changePassword(req.adminId, oldPassword, newPassword);

  res.status(200).json({ message: 'Password updated successfully' });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);

  res.status(200).json(result);
});

const verifyOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.verifyOtp(email, otp);

  res.status(200).json(result);
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await authService.resetPassword(email, newPassword);

  res.status(200).json(result);
});

module.exports = {
  createAdmin,
  login,
  logout,
  refreshAccessToken,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
