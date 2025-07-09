// controllers/expense.js

const Expense = require('../Modal/Expenses'); // Make sure this path is correct: '../Modal/Expenses.js' or just '../Modal/Expenses' depending on your setup.
const User = require('../Modal/modal'); // Assuming this is your user model if needed elsewhere.

// --- 1. addExpense FUNCTION DEFINITION ---
const addExpense = async (req, res) => {
    console.log("\n--- Backend (Controller): addExpense function hit ---");
    console.log("Backend (Controller): Request Body (text fields):", req.body);
    console.log("Backend (Controller): Request Files (uploaded bills):", req.files); // req.files is populated by Multer

    // Ensure Multer has processed the files; otherwise, req.files might be undefined or empty
    if (!req.files || req.files.length === 0) {
        console.warn("Backend (Controller): Multer did not process any files. Ensure frontend FormData field name is 'bills' and Multer is correctly applied in the route.");
    }

    const { name, amount, desc, email } = req.body;

    // Server-side validation
    if (!name || !amount || !email) {
        console.error("Backend (Controller): Validation Error - Missing required fields:", { name, amount, email });
        // Attempt to clean up uploaded files if validation fails
        if (req.files) {
            req.files.forEach(file => {
                const fs = require('fs');
                if (fs.existsSync(file.path)) {
                    fs.unlink(file.path, (err) => {
                        if (err) console.error(`Failed to delete uploaded file ${file.path}:`, err);
                    });
                }
            });
        }
        return res.status(400).json({ message: "Name, amount, and email are required." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error("Backend (Controller): Validation Error - Invalid amount:", amount);
        // Attempt to clean up uploaded files if validation fails
        if (req.files) {
            req.files.forEach(file => {
                const fs = require('fs');
                if (fs.existsSync(file.path)) {
                    fs.unlink(file.path, (err) => {
                        if (err) console.error(`Failed to delete uploaded file ${file.path}:`, err);
                    });
                }
            });
        }
        return res.status(400).json({ message: "Amount must be a positive number." });
    }

    try {
        const docUpload = (req.files || []).map(file => {
            // Construct the URL for the uploaded file
            // Assuming your server.js has `app.use('/uploads', express.static(path.join(__dirname, 'uploads')));`
            // and your server is running on port 5000 (or whatever process.env.PORT is)
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            console.log(`Backend (Controller): Processed file: ${file.originalname}, URL: ${fileUrl}`);
            return {
                url: fileUrl,
                fileName: file.originalname, // Original name of the file
                contentType: file.mimetype // MIME type of the file
            };
        });

        const newExpense = new Expense({
            name: name,
            amount: parsedAmount,
            desc: desc,
            email: email, // Make sure your Expense schema has a 'userEmail' field
            docUpload: docUpload,
            date: new Date(), // Automatically set current date/time
        });

        const savedExpense = await newExpense.save();
        console.log("Backend (Controller): Expense successfully saved to MongoDB:", savedExpense);
        res.status(201).json(savedExpense);

    } catch (err) {
        console.error("Backend (Controller): Error adding expense:", err);

        // If there was an error saving to DB, attempt to clean up uploaded files
        if (req.files) {
            req.files.forEach(file => {
                const fs = require('fs'); // Require fs here if not already at top
                if (fs.existsSync(file.path)) {
                    fs.unlink(file.path, (deleteErr) => {
                        if (deleteErr) console.error(`Failed to delete orphaned file ${file.path}:`, deleteErr);
                        else console.log(`Deleted orphaned file: ${file.path}`);
                    });
                }
            });
        }

        // Handle specific Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.error("Backend (Controller): Mongoose Validation Errors:", messages);
            return res.status(400).json({ message: "Validation error", errors: messages });
        }
        // Generic server error
        res.status(500).json({ message: err.message || "Failed to add expense due to server error." });
    } finally {
        console.log("--- Backend (Controller): addExpense function finished --- \n");
    }
};

// --- 2. viewExpenses FUNCTION DEFINITION ---
const viewExpenses = async (req, res) => {
    console.log("\n--- Backend (Controller): viewExpenses function hit ---");
    const { email } = req.query;
    console.log("Backend (Controller): Requesting expenses for email:", email);

    if (!email) {
        console.error("Backend (Controller): View Expenses - Email query parameter is missing.");
        return res.status(400).json({ message: "Email parameter is required." });
    }

    try {
        // Find expenses by the 'userEmail' field in your schema
        const expenses = await Expense.find({ email: email }).sort({ date: -1 }); // Sort by newest first
        console.log(`Backend (Controller): Found ${expenses.length} expenses for ${email}.`);
        res.status(200).json(expenses);
    } catch (err) {
        console.error("Backend (Controller): Error fetching expenses:", err);
        res.status(500).json({ message: err.message || "Failed to fetch expenses." });
    } finally {
        console.log("--- Backend (Controller): viewExpenses function finished --- \n");
    }
};

// --- 3. processBillForOCR FUNCTION DEFINITION (placeholder) ---
const processBillForOCR = async (req, res) => {
    console.log("\n--- Backend (Controller): processBillForOCR function hit (Not Implemented) ---");
    res.status(501).json({ message: "Bill OCR processing is not implemented yet." });
};


// --- EXPORTS SECTION ---
module.exports = {
    addExpense,
    viewExpenses,
    processBillForOCR, // Only include if you have this function defined and exported
};