const Inventory = require('../Modal/Inventory');
const Site = require('../Modal/newConstruction'); // Site model (for validation)

// 👉 Create a new inventory item (with site validation)
exports.createInventory = async (req, res) => {
  try {
    const { site } = req.body;

    // Validate site exists
    const existingSite = await Site.findById(site);
    if (!existingSite) {
      return res.status(400).json({ success: false, message: "Invalid site ID provided" });
    }

    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json({ success: true, message: "Inventory item created successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating item", error: error.message });
  }
};

// 👉 Get all inventory items (with populated site)
exports.getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find().populate('site'); // Populate site info
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching inventory", error: error.message });
  }
};

// 👉 Get summary (MaterialName, Quantity, Unit only)
exports.getInventorySummary = async (req, res) => {
  try {
    const summary = await Inventory.find({}, 'MaterialName Quantity Unit');
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching summary", error: err.message });
  }
};

// 👉 Get item by ID (with populated site)
exports.getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('site');
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching item", error: error.message });
  }
};

// 👉 Update item by ID
exports.updateInventory = async (req, res) => {
  try {
    // Optional: validate new site ID if passed
    if (req.body.site) {
      const siteExists = await Site.findById(req.body.site);
      if (!siteExists) {
        return res.status(400).json({ success: false, message: "Invalid site ID provided" });
      }
    }

    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, message: "Item updated", data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating item", error: error.message });
  }
};

// 👉 Delete item by ID
exports.deleteInventory = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting item", error: error.message });
  }
};

// 👉 Get inventory items by site ID
exports.getInventoryBySite = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const items = await Inventory.find({ site: siteId }).populate('site');
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching inventory by site", error: err.message });
  }
};

exports.getAllSitesWithInventory = async (req, res) => {
  try {
    const sites = await Site.find();

    const result = await Promise.all(
      sites.map(async (site) => {
        const inventories = await Inventory.find({ site: site._id });
        return {
          ...site.toObject(),
          inventories
        };
      })
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sites with inventories", error: error.message });
  }
};