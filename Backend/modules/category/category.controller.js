const categoryService = require('./category.service');
const catchAsync = require('../../utils/catchAsync');

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ success: true, data: categories });
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json({ success: true, data: category });
});

const getCategoryBySlug = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  res.status(200).json({ success: true, data: category });
});

const createCategory = catchAsync(async (req, res) => {
  const data = { ...req.body };
  
  // Parse JSON fields
  if (data.highlights && typeof data.highlights === 'string') {
    try { data.highlights = JSON.parse(data.highlights); } catch (e) { console.error('highlights parse error', e); }
  }
  if (data.keyHighlights && typeof data.keyHighlights === 'string') {
    try { data.keyHighlights = JSON.parse(data.keyHighlights); } catch (e) { console.error('keyHighlights parse error', e); }
  }

  // Handle image upload if any (similar to packages)
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.bannerImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  const category = await categoryService.createCategory(data);
  res.status(201).json({ success: true, data: category });
});

const updateCategory = catchAsync(async (req, res) => {
  const data = { ...req.body };

  if (data.highlights && typeof data.highlights === 'string') {
    try { data.highlights = JSON.parse(data.highlights); } catch (e) { console.error('highlights parse error', e); }
  }
  if (data.keyHighlights && typeof data.keyHighlights === 'string') {
    try { data.keyHighlights = JSON.parse(data.keyHighlights); } catch (e) { console.error('keyHighlights parse error', e); }
  }

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.bannerImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  const category = await categoryService.updateCategory(req.params.id, data);
  res.status(200).json({ success: true, data: category });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({ success: true, message: 'Category deleted' });
});

module.exports = {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
