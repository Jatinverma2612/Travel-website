const { z } = require('zod');

const createPackageSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.union([z.number(), z.string()]).transform(val => Number(val)),
    duration: z.string().min(1, 'Duration is required'),
    description: z.string().min(1, 'Description is required'),
    image_url: z.string().url('Invalid URL format').optional().or(z.literal('')),
  }),
};

const updatePackageSchema = {
  body: z.object({
    title: z.string().optional(),
    price: z.union([z.number(), z.string()]).transform(val => Number(val)).optional(),
    duration: z.string().optional(),
    description: z.string().optional(),
    image_url: z.string().url('Invalid URL format').optional().or(z.literal('')),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(val => Number(val)),
  }),
};

const getPackageSchema = {
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(val => Number(val)),
  }),
};

module.exports = {
  createPackageSchema,
  updatePackageSchema,
  getPackageSchema,
};
