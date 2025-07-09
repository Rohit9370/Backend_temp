const express = require('express');
const router = express.Router();
const {NewSite, GetData} = require("../controllers/dashboardController")



router.post('/', NewSite);
router.get('/', GetData);
    


module.exports = router;
