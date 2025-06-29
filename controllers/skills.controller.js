const skillsData = require("../models/skillsSchema");

exports.addSkill = async (req, res) => {
  const fileName = req.file ? req.file.filename : null;
  try {
    const { name, hidden } = req.body;
    console.log(req.body);
    const skill = await skillsData.create({
      name: name,
      imageUrl: fileName,
      hidden: hidden,
    });
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVisibleSkills = async (req, res) => {
  try {
    const Allskills = await skillsData.find({ hidden: false });
    res.status(200).json(Allskills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllskills = async (req, res) => {
  try {
    const Allskills = await skillsData.find();
    res.status(200).json(Allskills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const Allskills = await skillsData.findById(req.params.id);
    res.status(200).json(Allskills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHiddenSkills = async (req, res) => {
  try {
    const hiddenSkills = await skillsData.find({ hidden: true });
    res.status(200).json(hiddenSkills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editSkills = async (req, res) => {
  const { id } = req.params;
  const { name, hidden, imageUrl } = req.body;
  const img = req.file ? req.file.filename : imageUrl;
  try {
    const updatedskill = await skillsData.findByIdAndUpdate(
      id,
      {
        name,
        imageUrl: img,
        hidden,
      },
      {
        new: true,
      }
    );

    if (!updatedskill) {
      return res.status(404).json({ error: "skill not found" });
    }

    res.status(200).json(updatedskill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.hideskill = async (req, res) => {
  try {
    const { id } = req.params;

    const hiddenProduct = await skillsData.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!hiddenProduct) {
      return res.status(404).json({ message: "skill not found" });
    }

    res.status(200).json(hiddenProduct);
  } catch (error) {
    console.error("Error in Hideskill:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await skillsData.findByIdAndDelete(id, {
      new: true,
    });

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json(deletedSkill);
  } catch (error) {
    console.error("Error in delete Skill:", error);
    res.status(500).json({ error: error.message });
  }
};
