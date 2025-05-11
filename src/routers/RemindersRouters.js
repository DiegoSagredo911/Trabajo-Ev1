const express = require("express");
const reminders = express.Router();
const remindersController = require("../controllers/RemindersControllers");
const {validateBody,validateParams} = require("../Middleware/MiddlewareValibot");
const schemas = require("../Middleware/schemas/reminders");

reminders.get("/", remindersController.getAll);

reminders.post("/", validateBody(schemas.create), remindersController.create);

reminders.patch(
  "/:uuid",
  validateParams(schemas.params),
  validateBody(schemas.update),
  remindersController.update
);

reminders.delete(
  "/:uuid",
  validateParams(schemas.params),
  remindersController.remove
);

module.exports = reminders;
