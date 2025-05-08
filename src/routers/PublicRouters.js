const express = require("express");
const public = express.Router();
const PublicControllers = require("../controllers/PublicControllers");
const {validateBody} = require("../Middleware/MiddlewareValibot");
const schemas = require("../Middleware/schemas/public");

public.post("/login", validateBody(schemas.login), PublicControllers.login);

module.exports = PublicRouters = public;
