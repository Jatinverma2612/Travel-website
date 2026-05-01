const reviewRepository = require('./review.repository');

const getReviews = async () => {
  return await reviewRepository.findAllReviews();
};

const createReview = async (reviewData) => {
  return await reviewRepository.createReview(reviewData);
};

module.exports = {
  getReviews,
  createReview,
};
