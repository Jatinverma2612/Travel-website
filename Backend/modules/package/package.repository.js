const prisma = require('../../config/db');

const findAllPackages = async (options = {}) => {
  const limit = options.limit ? parseInt(options.limit) : undefined;
  const offset = options.offset ? parseInt(options.offset) : undefined;

  return await prisma.package.findMany({
    orderBy: { created_at: 'desc' },
    ...(Number.isInteger(limit) && { take: limit }),
    ...(Number.isInteger(offset) && { skip: offset }),
  });
};

const findPackageById = async (id) => {
  return await prisma.package.findUnique({
    where: { id },
  });
};

const createPackage = async (data) => {
  return await prisma.package.create({ data });
};

const updatePackage = async (id, data) => {
  return await prisma.package.update({
    where: { id },
    data,
  });
};

const deletePackage = async (id) => {
  return await prisma.package.delete({ where: { id } });
};

module.exports = {
  findAllPackages,
  findPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
