const Expense = require('../Modal/Expenses'); // Make sure path is correct
const User = require("../Modal/modal"); // Assuming 'modal' is your User/Auth model, renamed for clarity
// No need for fs or path here if you're not reading the file into buffer

const addExpense = async (req, res) => {
  try {
    const { name, amount, email } = req.body; // Text fields from the form
    const docFile = req.file; // The uploaded file object from Multer

    // Validate user existence (assuming 'Modal' is your User model)
    const exists = await User.findOne({ email }); // <--- Assuming 'Modal' is your User model
    if (!exists) {
      return res.status(400).json({ message: "Valid User required" });
    }

    let docUploadData = {}; // Initialize an empty object for docUpload

    // If a file was uploaded, construct its URL and store content type
    if (docFile) {
      // Construct the full URL of the uploaded file
      // req.protocol will be 'http' or 'https'
      // req.get('host') will be 'localhost:PORT' or your domain
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${docFile.filename}`;

      docUploadData = {
        contentType: docFile.mimetype,
        url: fileUrl, // Store the URL in the database
      };
    }

    const newExpense = new Expense({
      name,
      amount: Number(amount), // Ensure amount is a number
      docUpload: docUploadData, // Assign the prepared docUpload object
      email
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);

  } catch (err) {
    console.error("Error adding expense:", err); // Log error for debugging
    res.status(400).json({ message: err.message || "Failed to add expense." });
  }
};

// controllers/expenseController.js file mein jaake
const viewExpenses = async (req, res) => {
  try {
    // We no longer need to exclude 'docUpload.data' because 'data' field is removed from schema.
    // The 'docUpload.url' and 'docUpload.contentType' will be included by default.
    const expenses = await Expense.find({});

    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err); // Log error for debugging
    res.status(500).json({ message: err.message || "Failed to fetch expenses." });
  }
};

// Make sure to export both functions
module.exports = {
  addExpense,
  viewExpenses
};