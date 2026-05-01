const packageService = require('./package.service');
const catchAsync = require('../../utils/catchAsync');
const ApiResponse = require('../../utils/ApiResponse');

const getPackages = catchAsync(async (req, res) => {
  const packages = await packageService.getPackages();
  res.status(200).json(packages); // Keeping the direct array response to not break frontend
});

const getPackageById = catchAsync(async (req, res) => {
  const pkg = await packageService.getPackageById(req.params.id);
  res.status(200).json(pkg); // Keeping direct response
});

const createPackage = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.image_url = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const newPackage = await packageService.createPackage(data);
  res.status(201).json(newPackage);
});

const updatePackage = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    data.image_url = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const updatedPackage = await packageService.updatePackage(req.params.id, data);
  res.status(200).json(updatedPackage);
});

const deletePackage = catchAsync(async (req, res) => {
  await packageService.deletePackage(req.params.id);
  res.status(200).json({ message: 'Package removed' });
});

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
