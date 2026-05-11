const prisma = require('../../config/db');
const ApiError = require('../../utils/ApiError');

const getAllCategories = async () => {
  return await prisma.tourCategory.findMany({
    include: {
      packages: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

const getCategoryById = async (id) => {
  const category = await prisma.tourCategory.findUnique({
    where: { id: Number(id) },
    include: {
      packages: true
    }
  });
  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};

const getCategoryBySlug = async (slug) => {
  // First try exact match
  let category = await prisma.tourCategory.findUnique({
    where: { slug },
    include: {
      packages: true
    }
  });

  // If not found, try case-insensitive match (using findFirst since findUnique is case-sensitive)
  if (!category) {
    category = await prisma.tourCategory.findFirst({
      where: {
        slug: {
          equals: slug,
          mode: 'insensitive'
        }
      },
      include: {
        packages: true
      }
    });
  }

  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};

const createCategory = async (data) => {
  return await prisma.tourCategory.create({ data });
};

const updateCategory = async (id, data) => {
  return await prisma.tourCategory.update({
    where: { id: Number(id) },
    data
  });
};

const deleteCategory = async (id) => {
  return await prisma.tourCategory.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
