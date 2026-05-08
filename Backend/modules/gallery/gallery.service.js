const ApiError = require('../../utils/ApiError');
const galleryRepository = require('./gallery.repository');
const cloudinary = require('../../config/cloudinary');

const getAllGalleryImages = async () => {
  return await galleryRepository.findAllGalleryImages();
};

const addGalleryImage = async (image_url, public_id) => {
  if (!image_url) {
    throw new ApiError(400, "An image file or image_url is required");
  }

  return await galleryRepository.createGalleryImage({ image_url, public_id });
};

const deleteGalleryImage = async (id) => {
  try {
    const image = await galleryRepository.findGalleryImageById(Number(id));
    if (!image) {
      throw new ApiError(404, "Image not found");
    }
    
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    
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
