const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// 👉 Create a new inventory item
router.post('/', inventoryController.createInventory);

// 👉 Get all inventory items (full details)
router.get('/', inventoryController.getAllInventory);

// 👉 Get summary (only MaterialName, Quantity, Unit)
router.get('/summary', inventoryController.getInventorySummary);

// 👉 Get a specific inventory item by ID
router.get('/:id', inventoryController.getInventoryById);

// 👉 Update an inventory item by ID
router.put('/:id', inventoryController.updateInventory);

// 👉 Delete an inventory item by ID
router.delete('/:id', inventoryController.deleteInventory);

// site Id 
router.get('/site/:siteId', inventoryController.getInventoryBySite);

// get all site wiht a all data
router.get('/with-inventory', inventoryController.getAllSitesWithInventory);



module.exports = router;

// POST http://localhost:5000/api/inventory
// GET http://localhost:5000/api/inventory
// GET http://localhost:5000/api/inventory/summary
// GET http://localhost:5000/api/inventory/665e2e1b3c991c28c46e8723
// PUT http://localhost:5000/api/inventory/665e2e1b3c991c28c46e8723
// DELETE http://localhost:5000/api/inventory/665e2e1b3c991c28c46e8723
// GET http://localhost:5000/api/inventory/site/:siteId
// GET http://localhost:5000/api/inventory/with-inventory