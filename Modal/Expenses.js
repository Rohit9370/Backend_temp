// Modal/Expenses.js (or whatever your schema file is named)
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    desc: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true }, // <--- CHANGE THIS FROM 'userEmail' to 'email'
    date: { type: Date, default: Date.now },
    docUpload: [
        {
            url: { type: String, required: true },
            fileName: { type: String },
            contentType: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);