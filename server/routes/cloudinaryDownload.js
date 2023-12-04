const express = require("express");
const router = express.Router();

const [requireAuth, authRole] = require("../middleware/requireAuth");
const {downloadSelectedFile}=require("../controllers/downloadController")

router.get("/",downloadSelectedFile)

module.exports = router;
