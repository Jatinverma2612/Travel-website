const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const { protect } = require('../../middleware/auth.middleware');
const upload = require('../../middleware/memoryUpload');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

router.post('/', protect, upload.single('banner_file'), categoryController.createCategory);
router.put('/:id', protect, upload.single('banner_file'), categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router;
