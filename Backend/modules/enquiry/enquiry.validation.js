const { z } = require('zod');

const createEnquirySchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
  }),
};

const deleteEnquirySchema = {
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(val => Number(val)),
  }),
};

module.exports = {
  createEnquirySchema,
  deleteEnquirySchema,
};
