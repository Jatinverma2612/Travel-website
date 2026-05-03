const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema } = require('./auth.validation');
const { protect } = require('../../middleware/auth.middleware');

router.post('/create-admin', validate(registerSchema), authController.createAdmin);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', protect, authController.logout);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/change-password', protect, validate(changePasswordSchema), authController.changePassword);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;
