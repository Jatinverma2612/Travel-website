const ApiError = require('../../utils/ApiError');
const packageRepository = require('./package.repository');

const getPackages = async () => {
  return await packageRepository.findAllPackages();
};

const getPackageById = async (id) => {
  const pkg = await packageRepository.findPackageById(Number(id));

  if (!pkg) {
    throw new ApiError(404, 'Package not found');
  }

  return pkg;
};

const createPackage = async (packageData) => {
  return await packageRepository.createPackage(packageData);
};

const updatePackage = async (id, packageData) => {
  const existingPackage = await packageRepository.findPackageById(Number(id));

  if (!existingPackage) {
    throw new ApiError(404, 'Package not found');
  }

  return await packageRepository.updatePackage(Number(id), packageData);
};

const deletePackage = async (id) => {
  const existingPackage = await packageRepository.findPackageById(Number(id));

  if (!existingPackage) {
    throw new ApiError(404, 'Package not found');
  }

  await packageRepository.deletePackage(Number(id));
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
