const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // <--- MODIFIED docUpload SCHEMA HERE --->
    docUpload: {
      contentType: String, // e.g., 'image/jpeg', 'application/pdf'
      url: String,         // <--- NEW: Stores the public URL of the uploaded file
    },
    // <--- END MODIFIED SCHEMA --->
    date: {
      type: Date,
      default : Date.now
    },
    email:{
      type: String,
      required: true,
    }
  },
  { collection: "Expenses" } // Explicitly sets collection name
);

module.exports = mongoose.model("Expenses", ExpenseSchema);