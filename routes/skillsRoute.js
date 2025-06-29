const express = require("express");
const { handleSingleImage } = require("../config/multer.config");
const {
  addSkill,
  getVisibleSkills,
  getAllskills,
  getSkillById,
  getHiddenSkills,
  editSkills,
  hideskill,
  deleteSkill,
} = require("../controllers/skills.controller");
const route = express.Router();

const skillsData = require("../models/skillsSchema");
const { authenticate } = require("../middleware/auth.middleware");

// route.post("/addbulkSkills", async (req, res) => {
//   try {
//     const bulkskill = await skillsData.insertMany(req.body);
//     res.status(201).json(bulkskill);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

route.post("/addSkill", authenticate, handleSingleImage("img"), addSkill);

route.get("/getVisibleSkills", getVisibleSkills);

route.get("/getAllskills", getAllskills);

route.get("/getSkillById/:id", getSkillById);

route.get("/getHiddenSkills", getHiddenSkills);

route.put(
  "/editSkills/:id",
  authenticate,
  handleSingleImage("img"),
  editSkills
);

route.put("/hideskill/:id", authenticate, hideskill);

route.delete("/deleteSkill/:id", deleteSkill);
module.exports = route;
