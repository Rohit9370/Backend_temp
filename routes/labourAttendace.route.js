const express = require("express");
const router = express.Router();
const {
  createLabourAttendance,
  getAllLabourAttendance,
  getAttendanceByDate,
} = require("../controllers/attendance.controller");


router.post("/", createLabourAttendance);

router.get("/", getAllLabourAttendance);

router.get("/by-date", getAttendanceByDate);

module.exports = router;
