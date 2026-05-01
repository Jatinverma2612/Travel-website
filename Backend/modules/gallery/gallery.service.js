const ApiError = require('../../utils/ApiError');
const galleryRepository = require('./gallery.repository');

const getAllGalleryImages = async () => {
  return await galleryRepository.findAllGalleryImages();
};

const addGalleryImage = async (image_url) => {
  if (!image_url) {
    throw new ApiError(400, "An image file or image_url is required");
  }

  return await galleryRepository.createGalleryImage({ image_url });
};

const deleteGalleryImage = async (id) => {
  try {
    await galleryRepository.deleteGalleryImage(Number(id));
  } catch (error) {
    if (error.code === 'P2025') {
      throw new ApiError(404, "Image not found");
    }
    throw error;
  }
};

module.exports = {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
};
