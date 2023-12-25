const express = require("express");
const router = express.Router()

const {getMemberContributions}=require("../controllers/chartsController")
const [requireAuth]=require("../middleware/requireAuth")

router.get("/:id",requireAuth,getMemberContributions)


module.exports =router