const ProjectData = require("../models/projectSchema");

exports.addProject = async (req, res) => {
  const tech = req.body.technology || [];

  try {
    const {
      title,
      category,
      url,
      description,
      "credentials.userName": userName,
      "credentials.password": password,
      hidden,
    } = req.body;

    const project = await ProjectData.create({
      title,
      image: req.file ? req.file.filename : null,
      category,
      url,
      description,
      technology: Array.isArray(tech) ? tech : [tech],
      credentials: { userName, password },
      hidden,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVisibleProjects = async (req, res) => {
  try {
    const allProjects = await ProjectData.find({ hidden: false });
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectData.find();
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHiddenProjects = async (req, res) => {
  try {
    const hiddenProjects = await ProjectData.find({ hidden: true });
    res.status(200).json(hiddenProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editProject = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  const updateData = req.body;
  const img = req.file ? req.file.filename : null;

  if (img) {
    updateData.image = img;
  }

  try {
    const updatedProject = await ProjectData.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.hideProject = async (req, res) => {
  try {
    const { id } = req.params;

    const hiddenProject = await ProjectData.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!hiddenProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(hiddenProject);
  } catch (error) {
    console.error("Error in hideProject:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const filteredProjects = await ProjectData.find({ category });
    res.status(200).json(filteredProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await ProjectData.findByIdAndDelete(id, {
      new: true,
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(deletedProject);
  } catch (error) {
    console.error("Error in delete Project:", error);
    res.status(500).json({ error: error.message });
  }
};
