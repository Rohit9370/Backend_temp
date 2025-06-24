const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  MaterialName: String,
  MaterialType: String,
  Quantity: Number,
  Unit: String,
  LowStockThreshold: Number,
  TargetStockLevel: Number,
  VendorSupplier: String,
  StorageLocation: String,
  Description: String,

  // ✅ Link to site
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'newConstruction',
    required: true
  }

}, { collection: 'Inventory' });

module.exports = mongoose.model('Inventory', InventorySchema);
