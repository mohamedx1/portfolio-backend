const express = require("express");

const route = express.Router();

const { login, signUp } = require("../controllers/auth.controller");

route.post("/login", login);
route.post("/signUp", signUp);

module.exports = route;
