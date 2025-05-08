const express = require("express");
const reminders = express.Router();
const remindersController = require("../controllers/RemindersControllers");
const middleware = require("../Middleware/MiddlewareValibot");
const schemas = require("../Middleware/schemas/reminders");

reminders.get("/", remindersController.getAll);

reminders.post("/", middleware(schemas.create), remindersController.create);

reminders.patch(
  "/:uuid",
  middleware(schemas.update),
  remindersController.update
);

reminders.delete(
  "/:uuid",
  middleware(schemas.remove),
  remindersController.remove
);

module.exports = reminders;
