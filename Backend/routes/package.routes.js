const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/package.controller');

router.route('/')
  .get(getPackages)
  .post(protect, createPackage);

router.route('/:id')
  .get(getPackageById)
  .put(protect, updatePackage)
  .delete(protect, deletePackage);

module.exports = router;
