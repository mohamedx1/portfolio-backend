const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const skillsSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    hidden: Boolean,
  },
  { timestamps: true }
);

const skills = Mongoose.model("skillsSchema", skillsSchema);

module.exports = skills;
