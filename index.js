const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db.config");
const PORT = process.env.PORT || 3000;
const path = require("path");
const projects = require("./routes/projectsRoute");
const skills = require("./routes/skillsRoute");
const experiences = require("./routes/experiencesRoute");
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/projects", projects);
app.use("/skills", skills);
app.use("/experience", experiences);
app.use("/portfolio", portfolioRoutes);
app.use("/contact", contactRoute);
app.use("/auth", authRoute);

connectDb();

app.listen(PORT, () => {
  console.log(`iam listen to port ${PORT}`);
});
