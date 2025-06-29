const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const experienceSchema = new Schema(
  {
    title: { type: String, required: true }, // e.g., Frontend Developer
    company: { type: String, required: true }, // e.g., Google
    location: String, // e.g., Remote or San Francisco, CA
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // can be null for ongoing
    description: String,
    responsibilities: [String], // key points / bullet list
    technologies: [String], // e.g., ["React", "TypeScript"]
    image: String, // company logo or related image
    hidden: Boolean,
  },
  { timestamps: true }
);

const experiences = Mongoose.model("experienceSchema", experienceSchema);

module.exports = experiences;
