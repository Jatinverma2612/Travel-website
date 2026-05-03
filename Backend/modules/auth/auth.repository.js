const prisma = require('../../config/db');

const findAdminByEmail = async (email) => {
  return await prisma.admin.findUnique({ where: { email } });
};

const findAdminById = async (id) => {
  return await prisma.admin.findUnique({ where: { id } });
};

const createAdmin = async (data) => {
  return await prisma.admin.create({ data });
};

const updateAdmin = async (id, data) => {
  return await prisma.admin.update({
    where: { id },
    data,
  });
};

const countAdmins = async () => {
  return await prisma.admin.count();
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updateAdmin,
  countAdmins,
};
