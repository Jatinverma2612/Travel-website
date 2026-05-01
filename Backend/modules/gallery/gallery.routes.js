const express = require('express');
const router = express.Router();
const galleryController = require('./gallery.controller');
const upload = require('../../middleware/upload');
const { protect } = require('../../middleware/auth.middleware');

router.post('/', protect, upload.single('image_file'), galleryController.addGalleryImage);
router.get('/', galleryController.getAllGalleryImages);
router.delete('/:id', protect, galleryController.deleteGalleryImage);

module.exports = router;
