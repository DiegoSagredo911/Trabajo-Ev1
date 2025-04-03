const express = require("express");
const public = express.Router();
const PublicControllers = require("../controllers/PublicControllers");

public.post("/login", PublicControllers.login);

public.post("/register", PublicControllers.register);

module.exports = PublicRouters = public;
