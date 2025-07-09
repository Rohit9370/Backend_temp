const express = require("express");
const router = express.Router();
const Labor = require("../Modal/modal");
const Attendance = require("../Modal/Attendance");
function getISODateWithOffset() {
  return new Date().toISOString().replace("Z", "+00:00");
}

//handle client clocks-in
router.post("/", async (req, res) => {
  try {
    const { emailAddress, location } = req.body;

    if (!emailAddress) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Labor.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = user._id;
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    await Attendance.updateOne(
      { employeeId: id, date: todayMidnight },
      { $set: { "clockOut.time": new Date(), "clockOut.location": location } }
    );

    res.status(200).json({ message: "clocked out Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
