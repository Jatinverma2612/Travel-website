const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/review.controller');

router.route('/')
  .get(getReviews)
  .post(createReview);

module.exports = router;
