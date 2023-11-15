const express = require("express");
const router = express.Router()
const { getOptionList } = require("../controllers/optionsController");
const [requireAuth] = require("../middleware/requireAuth")
router.get('/',requireAuth,getOptionList);
module.exports=router;