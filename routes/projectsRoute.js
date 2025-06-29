const express = require("express");
const { handleSingleImage } = require("../config/multer.config");
const router = express.Router();

const projectController = require("../controllers/projects.controller");
const { authenticate } = require("../middleware/auth.middleware");

// Create a project
router.post(
  "/addProject",
  authenticate,
  handleSingleImage("image"),
  projectController.addProject
);

// Get all  projects
router.get("/getAllProjects", projectController.getAllProjects);

// Get all non-hidden projects
router.get("/getVisibleProjects", projectController.getVisibleProjects);

// Get all hidden projects
router.get("/getHiddenProjects", projectController.getHiddenProjects);

// Edit project
router.put(
  "/editeproject/:id",
  authenticate,
  handleSingleImage("image"),
  projectController.editProject
);

// Hide project
router.put(
  "/HideProject/:id",
  authenticate,
  handleSingleImage("image"),
  projectController.hideProject
);

// Filter by category
router.get(
  "/getProjectsByCategory/:category",
  projectController.getProjectsByCategory
);
router.delete("/deleteProject/:id", projectController.deleteProject);

module.exports = router;
