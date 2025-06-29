const express = require("express");
const {
  sendMessage,
  getAllMesages,
} = require("../controllers/messages.controller");

const route = express.Router();

route.post("/sendMessage", sendMessage);
route.get("/getAllMesages", getAllMesages);

module.exports = route;
