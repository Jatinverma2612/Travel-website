const { z } = require('zod');

const createBookingSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    message: z.string().optional(),
    package_id: z.union([z.number(), z.string()]).transform(val => Number(val)),
  }),
};

const updateBookingStatusSchema = {
  body: z.object({
    status: z.string().min(1, 'Status is required'),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(val => Number(val)),
  }),
};

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema,
};
