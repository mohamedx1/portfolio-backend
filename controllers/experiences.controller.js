const experiences = require("../models/experienceSchema");

exports.getVisableExperiences = async (req, res) => {
  try {
    const Experiences = await experiences.find({ hidden: false });
    res.status(200).json(Experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExperience = async (req, res) => {
  const { title, company, location, startDate, endDate, description, hidden } =
    req.body;
  try {
    const experience = await experiences.create({
      title,
      company,
      location,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      description,
      hidden: hidden === "false",
      responsibilities:
        req.body.responsibilities instanceof Array
          ? req.body.responsibilities
          : [req.body.responsibilities],
      technologies:
        req.body.technologies instanceof Array
          ? req.body.technologies
          : [req.body.technologies],
      image: req.file ? req.file.filename : null,
    });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const Experiences = await experiences.find();
    res.status(200).json(Experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editeExperiences = async (req, res) => {
  const { id } = req.params;
  const img = req.file ? req.file.filename : null;
  const updateData = req.body;
  if (img) {
    updateData.image = img;
  }
  try {
    const updatedExperiences = await experiences.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedExperiences) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(updatedExperiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExperiences = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExperiences = await experiences.findByIdAndDelete(id, {
      new: true,
    });

    if (!deletedExperiences) {
      return res.status(404).json({ message: "Experiences not found" });
    }

    res.status(200).json(deletedExperiences);
  } catch (error) {
    console.error("Error in delete Experiences:", error);
    res.status(500).json({ error: error.message });
  }
};
