const express = require("express");
const router = express.Router();
const { handleSingleImage } = require("../config/multer.config");
const {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
} = require("../controllers/portfolioController");

router.post("/createPortfolio", handleSingleImage("avatar"), createPortfolio);
router.get("/getPortfolio", getPortfolio);
router.put("/updatePortfolio", handleSingleImage("avatar"), updatePortfolio);

module.exports = router;
