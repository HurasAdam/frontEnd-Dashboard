const express = require("express");
const router = express.Router();

const [requireAuth, authRole] = require("../middleware/requireAuth");
const {downloadSelectedFile,deleteSelectedFile}=require("../controllers/downloadController")

router.get("/",downloadSelectedFile)
router.delete('/:id',deleteSelectedFile)

module.exports = router;
