const { z } = require('zod');

const createReviewSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    rating: z.union([z.number(), z.string()]).transform(val => Number(val)).refine(val => val >= 1 && val <= 5, 'Rating must be between 1 and 5'),
    message: z.string().min(1, 'Message is required'),
  }),
};

module.exports = {
  createReviewSchema,
};
