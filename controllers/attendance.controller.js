const LabourAttendance = require("../Modal/labourAttendance.model");

exports.createLabourAttendance = async (req, res) => {
  console.log("📥 POST /api/labour-attendance called"); // log when route is hit
  try {
    const {
      site_id,
      total_mason,
      total_labour,
      contractor,
      supplier,
      uploader_email,
    } = req.body;

    const newAttendance = new LabourAttendance({
      site_id,
      date: new Date(),
      total_mason,
      total_labour,
      contractor,
      supplier,
      uploader_email,
    });

    const savedAttendance = await newAttendance.save();

    console.log("✅ Saved to DB:", savedAttendance);

    res.status(201).json({
      message: "Labour attendance recorded successfully.",
      data: savedAttendance,
    });
  } catch (error) {
    console.error("❌ Error saving attendance:", error);
    res.status(500).json({
      message: "Failed to record attendance.",
      error: error.message,
    });
  }
};

exports.getAllLabourAttendance = async (req, res) => {
  try {
    const { site_id } = req.query;

    if (!site_id) {
      return res.status(400).json({ message: "site_id query param is required." });
    }

    const records = await LabourAttendance.find({ site_id })
      .sort({ date: -1 });

    res.status(200).json({ data: records });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve records.",
      error: error.message,
    });
  }
};


exports.getAttendanceByDate = async (req, res) => {
  try {
    const { site_id, date } = req.query;

    if (!site_id || !date) {
      return res.status(400).json({
        message: "Both site_id and date query params are required.",
      });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const records = await LabourAttendance.find({
      site_id,
      date: { $gte: start, $lte: end },
    }).sort({ site_id: 1 });

    res.status(200).json({ data: records });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve records by date.",
      error: error.message,
    });
  }
};

