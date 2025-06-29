const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    about: { type: String, required: true },
    jop: { type: String, required: true },
    summary: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
