const express = require("express");
const router = express.Router();
const [requireAuth,authRole]=require("../middleware/requireAuth")
const {validateInputData}= require("../middleware/validateInputData")
const {upload}=require("../middleware/multer")
// controller functions
const {
  updateProject,
  getSingleProject,
  createProject,
  getProjectList,
  deleteProject
} = require("../controllers/projectController");

// get projects


router.post("/",requireAuth,authRole('admin'),upload.array('file',3),createProject);
router.get("/",requireAuth,authRole('user','admin'), getProjectList);
router.get("/:id",requireAuth,authRole('user','admin') ,getSingleProject);
router.patch("/:id",requireAuth,authRole('admin'),validateInputData,updateProject)
router.delete("/:id",requireAuth,authRole('admin'),deleteProject)
module.exports = router;
