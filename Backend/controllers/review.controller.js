const prisma = require('../config/db');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    if (!name || !rating || !message) {
      return res.status(400).json({ message: 'Name, rating, and message are required' });
    }

    const numericRating = parseInt(rating, 10);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
    }

    const newReview = await prisma.review.create({
      data: {
        name,
        rating: numericRating,
        message,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
};
