const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getEnquiries,
  createEnquiry,
  deleteEnquiry
} = require('../controllers/enquiry.controller');

router.route('/')
  .get(protect, getEnquiries)
  .post(createEnquiry);

router.route('/:id')
  .delete(protect, deleteEnquiry);

module.exports = router;
