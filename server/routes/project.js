const express = require("express");
const router = express.Router();
const requireAuth=require("../middleware/requireAuth")


// controller functions
const {
  getSingleProject,
  createProject,
  getProjectList,
} = require("../controllers/projectController");

// get projects
router.use(requireAuth)

router.post("/",createProject);
router.get("/", getProjectList);
router.get("/:id", getSingleProject);


module.exports = router;
