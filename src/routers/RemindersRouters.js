const express = require("express");
const reminders = express.Router();
const remindersController = require("../controllers/RemindersControllers");
const remindersMiddleware = require("../Middleware/remindersMiddleware");

reminders.get("/", remindersController.getAll);

reminders.post(
  "/",
  remindersMiddleware.remindersCorrectFormat,
  remindersController.create
);

reminders.put(
  "/:id",
  remindersMiddleware.idCorrentFormat,
  remindersMiddleware.remindersCorrectFormat,
  remindersController.update
);

reminders.delete(
  "/:id",
  remindersMiddleware.idCorrentFormat,
  remindersController.remove
);

module.exports = RemindersRouter = reminders;
