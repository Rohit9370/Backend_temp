const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const expenseController = require('../controllers/expense');

// Multer storage config (KEEP AS IS)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure this 'uploads' directory exists at your server's root
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/process-bill', upload.single('docUpload'), expenseController.processBillForOCR);

// <--- CRITICAL CHANGE: Use upload.array and match the field name 'bills'
router.post('/add', upload.array('bills', 5), expenseController.addExpense); // Allow up to 5 bills
router.get('/', expenseController.viewExpenses);

module.exports = router;