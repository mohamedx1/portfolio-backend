const Portfolio = require("../models/portfolioSchema");

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne(); // only one allowed
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio data not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const existing = await Portfolio.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ message: "Portfolio already exists. Use update instead." });
    }
    const fileName = req.file ? req.file.filename : null;
    const { firstName, lastName, about, summary, jop } = req.body;
    const portfolio = await Portfolio.create({
      firstName,
      lastName,
      jop,
      about,
      summary,
      avatar: fileName,
    });
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const fileName = req.file ? req.file.filename : undefined;
    const { firstName, lastName, about, summary, jop } = req.body;

    const updateData = { firstName, lastName, about, summary, jop };
    if (fileName) updateData.avatar = fileName;

    const portfolio = await Portfolio.findOneAndUpdate({}, updateData, {
      new: true,
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio data not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
