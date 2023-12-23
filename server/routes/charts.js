const express = require("express");
const router = express.Router()

const {getMemberContributions}=require("../controllers/chartsController")
const [requireAuth]=require("../middleware/requireAuth")

router.get("/",requireAuth,getMemberContributions)


module.exports =router