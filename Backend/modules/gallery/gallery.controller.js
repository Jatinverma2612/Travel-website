const galleryService = require('./gallery.service');
const catchAsync = require('../../utils/catchAsync');
const cloudinary = require('../../config/cloudinary');

const getAllGalleryImages = catchAsync(async (req, res) => {
  const images = await galleryService.getAllGalleryImages();
  res.status(200).json(images);
});

const addGalleryImage = catchAsync(async (req, res) => {
  let image_url = req.body.image_url;
  let public_id = null;

  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'gallery' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    image_url = result.secure_url;
    public_id = result.public_id;
  }

  const newImage = await galleryService.addGalleryImage(image_url, public_id);
  res.status(201).json(newImage);
});

const deleteGalleryImage = catchAsync(async (req, res) => {
  await galleryService.deleteGalleryImage(parseInt(req.params.id));
  res.status(200).json({ message: "Image deleted successfully" });
});

module.exports = {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
};
