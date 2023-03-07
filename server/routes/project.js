const express = require("express");
const router = express.Router();

// controller functions
const {
  getSingleProject,
  createProject,
  getProjectList,
} = require("../controllers/projectController");

// get projects


router.post("/",createProject);
router.get("/", getProjectList);
router.get("/:id", getSingleProject);


module.exports = router;
