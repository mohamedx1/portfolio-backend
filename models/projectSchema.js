const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    image: String,
    category: String,
    url: { type: String, required: true },
    description: String,
    technology: [String],
    credentials: {
      userName: String,
      password: String,
    },
    hidden: Boolean,
  },
  { timestamps: true }
);

const project = Mongoose.model("projectSchema", projectSchema);

module.exports = project;
