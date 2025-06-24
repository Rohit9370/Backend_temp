const Expense = require('../Modal/Expenses'); // Make sure path is correct
const Modal = require("../Modal/modal");
var fs = require('fs');
var path = require('path');


const addExpense = async (req, res) => {
  try {
    // const {name, amount, docUpload, email} =req.body;

     const { name, amount, email } = req.body; // Text fields
    const docUpload = req.file; // Uploaded file

    if (!docUpload) {
      return res.status(400).json({ error: "File is required" });
    }

    const exists = await Modal.findOne({ email });
    if(!exists){
      res.status(400).json({ message: "Valid User required" });
      return;
    }
    const newExpense = new Expense({
      name,
      amount: Number(amount), // Ensure amount is a number
      docUpload: {
        data: fs.readFileSync(path.join("uploads", docUpload.filename)),
        contentType: docUpload.mimetype,
      },
      email
    });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// controllers/expenseController.js file mein jaake
const viewExpenses = async (req, res) => {
  try {
    // Sirf yeh line change karni hai:
    // 'docUpload.data': 0 ka matlab hai ki 'docUpload' object ke andar jo 'data' field hai, usko include mat karo response mein.
    const expenses = await Expense.find({}, { 'docUpload.data': 0 }); // <-- Yahan change karo

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Make sure to export both functions
module.exports = {
  addExpense,
  viewExpenses
};