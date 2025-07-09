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
<<<<<<< HEAD
    // <--- MODIFIED docUpload SCHEMA HERE --->
    docUpload: {
      contentType: String, // e.g., 'image/jpeg', 'application/pdf'
      url: String,         // <--- NEW: Stores the public URL of the uploaded file
    },
    // <--- END MODIFIED SCHEMA --->
=======
    docUpload: {
      data: Buffer,
      contentType: String,
    },
>>>>>>> 0496bbf9baa26690273a2b4e0ffd833c4829a304
    date: {
      type: Date,
      default : Date.now
    },
    email:{
      type: String,
      required: true,
    }
  },
<<<<<<< HEAD
  { collection: "Expenses" } // Explicitly sets collection name
);

module.exports = mongoose.model("Expenses", ExpenseSchema);
=======
  { collection: "Expenses" }
); // Explicitly sets collection name

module.exports = mongoose.model("Expenses", ExpenseSchema);
>>>>>>> 0496bbf9baa26690273a2b4e0ffd833c4829a304
