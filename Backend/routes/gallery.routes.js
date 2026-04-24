const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const upload = require('../middleware/upload');

router.post('/', upload.single('image_file'), galleryController.addGalleryImage);
router.get('/', galleryController.getAllGalleryImages);
router.delete('/:id', galleryController.deleteGalleryImage);

module.exports = router;
