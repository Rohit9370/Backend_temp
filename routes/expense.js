//route that will handle post requests from 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../Modal/Expenses');
const expenseController = require('../controllers/expense');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('docUpload'), expenseController.addExpense);

router.get('/', expenseController.viewExpenses);

module.exports = router;