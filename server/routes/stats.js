const express = require("express");

const {getStats}=require("../controllers/stats.Controller")

const router = express.Router();
router.get('/',getStats)
module.exports = router