const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  registerAdmin,
  loginAdmin,
  changePassword,
  forgotPassword,
} = require('../controllers/auth.controller');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
