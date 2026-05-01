const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const { createEnquirySchema, deleteEnquirySchema } = require('./enquiry.validation');
const enquiryController = require('./enquiry.controller');

router.route('/')
  .get(protect, enquiryController.getEnquiries)
  .post(validate(createEnquirySchema), enquiryController.createEnquiry);

router.route('/:id')
  .delete(protect, validate(deleteEnquirySchema), enquiryController.deleteEnquiry);

module.exports = router;
