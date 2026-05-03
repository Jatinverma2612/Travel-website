const { z } = require('zod');

const registerSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
};

const loginSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
};

const changePasswordSchema = {
  body: z.object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  }),
};

const forgotPasswordSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
  }),
};

const verifyOtpSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  }),
};

const resetPasswordSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
