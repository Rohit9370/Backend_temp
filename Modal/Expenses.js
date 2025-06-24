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
    docUpload: {
      data: Buffer,
      contentType: String,
    },
    date: {
      type: Date,
      default : Date.now
    },
    email:{
      type: String,
      required: true,
    }
  },
  { collection: "Expenses" }
); // Explicitly sets collection name

module.exports = mongoose.model("Expenses", ExpenseSchema);
