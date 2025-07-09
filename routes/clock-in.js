const express = require("express");
const router = express.Router();
const Modal = require("../Modal/modal");
const Labor = require("../Modal/modal");
const Attendance = require("../Modal/Attendance");

//handle client clocks-in
router.post("/", async (req, res) => {
  try {  
    const { emailAddress, location } = req.body;
    
    if (!emailAddress ) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Labor.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const id = user._id;
    const record = new Attendance({
      employeeId : id,
      clockIn : {location : location}
    });
    await record.save();
    res.status(200).json({message : "clocked in Successfully"});
  }
  catch (err) {
    res.status(500).json({message : err.message});
  }
}); 
module.exports = router;