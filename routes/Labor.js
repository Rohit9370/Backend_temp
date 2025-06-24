const express = require('express');
const router = express.Router();

const {addlabour, getsites , getAllLabour} = require("../controllers/labourcontroller");

router.post("/add", addlabour);
router.get("/sites", getsites);
router.get("/all", getAllLabour);


module.exports = router;