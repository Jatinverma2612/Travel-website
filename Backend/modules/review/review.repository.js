const prisma = require('../../config/db');

const findAllReviews = async () => {
  return await prisma.review.findMany({
    orderBy: { created_at: 'desc' },
  });
};

const createReview = async (data) => {
  return await prisma.review.create({ data });
};

module.exports = {
  findAllReviews,
  createReview,
};
