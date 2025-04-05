const express = require("express");
const public = express.Router();
const PublicControllers = require("../controllers/PublicControllers");

public.post("/login", PublicControllers.login);

module.exports = PublicRouters = public;
