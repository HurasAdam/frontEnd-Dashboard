const express = require("express");
const router = express.Router();

// controller functions
const {
  createProject,
  getProjectList,
} = require("../controllers/projectController");

// get projects


router.post("/",createProject);
router.get("/", getProjectList);

module.exports = router;
