const mongoose = require("mongoose");

const labourAttendanceSchema = new mongoose.Schema(
  {
    site_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    total_mason: {
      type: Number,
      default: 0,
    },
    total_labour: {
      type: Number,
      default: 0,
    },
    contractor: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    uploader_email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LabourAttendance", labourAttendanceSchema);
