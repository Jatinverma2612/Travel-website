const galleryService = require('./gallery.service');
const catchAsync = require('../../utils/catchAsync');

const getAllGalleryImages = catchAsync(async (req, res) => {
  const images = await galleryService.getAllGalleryImages();
  res.status(200).json(images);
});

const addGalleryImage = catchAsync(async (req, res) => {
  let image_url = req.body.image_url;

  if (req.file) {
    const baseUrl = req.protocol + '://' + req.get('host');
    image_url = `${baseUrl}/uploads/${req.file.filename}`;
  }

  const newImage = await galleryService.addGalleryImage(image_url);
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
