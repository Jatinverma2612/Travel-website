const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate.middleware');
const { createReviewSchema } = require('./review.validation');
const reviewController = require('./review.controller');

router.route('/')
  .get(reviewController.getReviews)
  .post(validate(createReviewSchema), reviewController.createReview);

module.exports = router;
