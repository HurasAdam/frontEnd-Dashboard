const express = require("express");
const router = express.Router();
const [requireAuth,authRole]=require("../middleware/requireAuth")


// controller functions
const {
  updateProject,
  getSingleProject,
  createProject,
  getProjectList,
  deleteProject
} = require("../controllers/projectController");

// get projects


router.post("/",requireAuth,authRole('admin'),createProject);
router.get("/",requireAuth,authRole('user','admin'), getProjectList);
router.get("/:id",requireAuth,authRole('user','admin') ,getSingleProject);
router.put("/:id",requireAuth,authRole('admin'),updateProject)
router.delete("/:id",requireAuth,authRole('admin'),deleteProject)
module.exports = router;
