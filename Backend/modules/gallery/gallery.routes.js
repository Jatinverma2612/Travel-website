const express = require('express');
const router = express.Router();
const galleryController = require('./gallery.controller');
const upload = require('../../middleware/upload');
const { protect } = require('../../middleware/auth.middleware');
const multer = require('multer');

const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ 
  storage: memoryStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', protect, memoryUpload.single('image_file'), galleryController.addGalleryImage);
router.get('/', galleryController.getAllGalleryImages);
router.delete('/:id', protect, galleryController.deleteGalleryImage);

module.exports = router;
