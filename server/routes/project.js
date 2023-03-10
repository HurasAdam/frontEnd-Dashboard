const express = require("express");
const router = express.Router();
const [requireAuth,authRole]=require("../middleware/requireAuth")


// controller functions
const {
  getSingleProject,
  createProject,
  getProjectList,
} = require("../controllers/projectController");

// get projects


router.post("/",requireAuth,createProject);
router.get("/",requireAuth,authRole, getProjectList);
router.get("/:id",requireAuth, getSingleProject);


module.exports = router;
