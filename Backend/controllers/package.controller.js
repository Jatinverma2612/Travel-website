const prisma = require('../config/db');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private (Admin)
const createPackage = async (req, res) => {
  try {
    const { title, price, duration, description, image_url } = req.body;

    const newPackage = await prisma.package.create({
      data: {
        title,
        price: parseFloat(price),
        duration,
        description,
        image_url,
      },
    });

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private (Admin)
const updatePackage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, price, duration, description, image_url } = req.body;

    const existingPackage = await prisma.package.findUnique({ where: { id } });

    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        title: title || existingPackage.title,
        price: price ? parseFloat(price) : existingPackage.price,
        duration: duration || existingPackage.duration,
        description: description || existingPackage.description,
        image_url: image_url || existingPackage.image_url,
      },
    });

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private (Admin)
const deletePackage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existingPackage = await prisma.package.findUnique({ where: { id } });

    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await prisma.package.delete({ where: { id } });

    res.json({ message: 'Package removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
