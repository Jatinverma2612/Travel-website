const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const upload = require('../../middleware/upload');
const { createPackageSchema, updatePackageSchema, getPackageSchema } = require('./package.validation');
const packageController = require('./package.controller');

router.route('/')
  .get(packageController.getPackages)
  .post(protect, upload.single('image_file'), validate(createPackageSchema), packageController.createPackage);

router.route('/:id')
  .get(validate(getPackageSchema), packageController.getPackageById)
  .put(protect, upload.single('image_file'), validate(updatePackageSchema), packageController.updatePackage)
  .delete(protect, validate(getPackageSchema), packageController.deletePackage);

module.exports = router;
