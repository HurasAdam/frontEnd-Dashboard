const express = require("express");
const router = express.Router();
const [requireAuth,authRole,authMembership]=require("../middleware/requireAuth")


// controller functions
const {
  getSingleProject,
  createProject,
  getProjectList,
} = require("../controllers/projectController");

// get projects


router.post("/",requireAuth,authRole('admin'),createProject);
router.get("/",requireAuth,authRole('admin'), getProjectList);
router.get("/:id",requireAuth,authRole('admin'),authMembership ,getSingleProject);


module.exports = router;
