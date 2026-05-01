const reviewService = require('./review.service');
const catchAsync = require('../../utils/catchAsync');

const getReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getReviews();
  res.status(200).json(reviews);
});

const createReview = catchAsync(async (req, res) => {
  const newReview = await reviewService.createReview(req.body);
  res.status(201).json(newReview);
});

module.exports = {
  getReviews,
  createReview,
};
