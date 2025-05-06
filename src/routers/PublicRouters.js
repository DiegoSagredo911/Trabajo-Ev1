const express = require("express");
const public = express.Router();
const PublicControllers = require("../controllers/PublicControllers");
const Middleware = require("../Middleware/MiddlewareValibot");
const schemas = require("../Middleware/schemas/public");

public.post("/login", Middleware(schemas.login), PublicControllers.login);

module.exports = PublicRouters = public;
