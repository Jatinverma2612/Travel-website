const reviewService = require('./review.service');

const getReviews = async (req, res) => {
  try {
    console.log('[API] GET /reviews - Starting DB query');
    
    // DB query will naturally return [] if empty, or throw if connection/schema fails
    const reviews = await reviewService.getReviews();
    
    console.log(`[API] GET /reviews - DB query successful, found ${reviews.length} records`);

    const safeReviews = reviews.map(rev => ({
      ...rev,
      rating: rev?.rating ?? 5,
      name: rev?.name || 'Anonymous',
      message: rev?.message || 'No review message provided.',
    }));

    return res.status(200).json({
      success: true,
      data: safeReviews
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createReview = async (req, res) => {
  try {
    console.log('[API] POST /reviews - Starting DB query');
    const newReview = await reviewService.createReview(req.body);
    console.log('[API] POST /reviews - DB query successful');
    
    return res.status(201).json({
      success: true,
      data: newReview
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getReviews,
  createReview,
};
