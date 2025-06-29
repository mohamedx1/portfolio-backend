const express = require("express");

const route = express.Router();
const { handleSingleImage } = require("../config/multer.config");
const { authenticate } = require("../middleware/auth.middleware");
const {
  addExperience,
  getVisableExperiences,
  getAllExperiences,
  editeExperiences,
  deleteExperiences,
} = require("../controllers/experiences.controller");

route.post(
  "/addExperience",
  authenticate,
  handleSingleImage("image"),
  addExperience
);

route.get("/getVisableExperiences", getVisableExperiences);

route.get("/getAllExperiences", getAllExperiences);

route.put(
  "/editeExperiences/:id",
  authenticate,
  handleSingleImage("image"),
  editeExperiences
);

route.delete("/deleteExperiences/:id", deleteExperiences);
// route.put("/hideExperiences/:id");

module.exports = route;
