const express = require('express');
const router = express.Router();
const {purchasePost, GetData } = require("../controllers/purchase")


router.post("/", purchasePost);
router.get("/", GetData)


module.exports = router;