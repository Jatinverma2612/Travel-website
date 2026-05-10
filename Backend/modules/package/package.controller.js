const packageService = require('./package.service');

const getPackages = async (req, res) => {
  try {
    console.log('[API] GET /packages - Starting DB query');
    
    // DB query will naturally return [] if empty, or throw if connection/schema fails
    const packages = await packageService.getPackages();
    
    console.log(`[API] GET /packages - DB query successful, found ${packages.length} records`);

    // Defensive coding: Ensure all fields exist and have safe defaults
    const safePackages = packages.map(pkg => ({
      ...pkg,
      duration: pkg?.duration || pkg?.days || 'N/A',
      price: pkg?.price ?? 0,
      title: pkg?.title || 'Untitled',
      description: pkg?.description || 'No description available',
    }));

    // To strictly follow the requested consistent response format:
    return res.status(200).json({
      success: true,
      data: safePackages
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    console.log(`[API] GET /packages/${req.params.id} - Starting DB query`);
    const pkg = await packageService.getPackageById(req.params.id);
    console.log(`[API] GET /packages/${req.params.id} - DB query successful`);
    
    return res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createPackage = async (req, res) => {
  try {
    console.log('[API] POST /packages - Starting DB query');
    const data = { ...req.body };
    if (data.price) data.price = parseFloat(data.price) || 0;
    if (data.rating) data.rating = parseFloat(data.rating) || 5.0;
    if (data.categoryId) data.categoryId = parseInt(data.categoryId) || null;
    if (data.timeline && typeof data.timeline === 'string') {
      try { data.timeline = JSON.parse(data.timeline); } catch (e) { data.timeline = []; }
    }
    if (data.inclusions && typeof data.inclusions === 'string') {
      try { data.inclusions = JSON.parse(data.inclusions); } catch (e) { data.inclusions = []; }
    }
    if (data.exclusions && typeof data.exclusions === 'string') {
      try { data.exclusions = JSON.parse(data.exclusions); } catch (e) { data.exclusions = []; }
    }
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      data.image_url = `${baseUrl}/uploads/${req.file.filename}`;
    }
    const newPackage = await packageService.createPackage(data);
    console.log('[API] POST /packages - DB query successful');
    
    return res.status(201).json({
      success: true,
      data: newPackage
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updatePackage = async (req, res) => {
  try {
    console.log(`[API] PUT /packages/${req.params.id} - Starting DB query`);
    const data = { ...req.body };
    if (data.price) data.price = parseFloat(data.price) || 0;
    if (data.rating) data.rating = parseFloat(data.rating) || 5.0;
    if (data.categoryId) data.categoryId = parseInt(data.categoryId) || null;
    if (data.timeline && typeof data.timeline === 'string') {
      try { data.timeline = JSON.parse(data.timeline); } catch (e) { data.timeline = []; }
    }
    if (data.inclusions && typeof data.inclusions === 'string') {
      try { data.inclusions = JSON.parse(data.inclusions); } catch (e) { data.inclusions = []; }
    }
    if (data.exclusions && typeof data.exclusions === 'string') {
      try { data.exclusions = JSON.parse(data.exclusions); } catch (e) { data.exclusions = []; }
    }
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      data.image_url = `${baseUrl}/uploads/${req.file.filename}`;
    }
    const updatedPackage = await packageService.updatePackage(req.params.id, data);
    console.log(`[API] PUT /packages/${req.params.id} - DB query successful`);
    
    return res.status(200).json({
      success: true,
      data: updatedPackage
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    console.log(`[API] DELETE /packages/${req.params.id} - Starting DB query`);
    await packageService.deletePackage(req.params.id);
    console.log(`[API] DELETE /packages/${req.params.id} - DB query successful`);
    
    return res.status(200).json({
      success: true,
      data: { message: 'Package removed' }
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
