const express = require("express");
const user = express.Router();
const UserControllers = require("../controllers/userController");

user.post("/logout", UserControllers.Logout);

module.exports = user;
