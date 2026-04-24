const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addGalleryImage = async (req, res) => {
  try {
    let image_url = req.body.image_url;

    if (req.file) {
      const baseUrl = req.protocol + '://' + req.get('host');
      image_url = `${baseUrl}/uploads/${req.file.filename}`;
    }

    if (!image_url) {
      return res.status(400).json({ message: "An image file or image_url is required" });
    }

    const newImage = await prisma.gallery.create({
      data: { image_url }
    });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllGalleryImages = async (req, res) => {
  try {
    const images = await prisma.gallery.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.gallery.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ message: "Image not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
