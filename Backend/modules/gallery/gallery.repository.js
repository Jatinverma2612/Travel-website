const prisma = require('../../config/db');

const findAllGalleryImages = async () => {
  return await prisma.gallery.findMany({
    orderBy: { created_at: 'desc' }
  });
};

const createGalleryImage = async (data) => {
  return await prisma.gallery.create({ data });
};

const deleteGalleryImage = async (id) => {
  return await prisma.gallery.delete({
    where: { id }
  });
};

module.exports = {
  findAllGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
};
