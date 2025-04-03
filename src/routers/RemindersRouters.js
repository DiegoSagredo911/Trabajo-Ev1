const express = require("express");
const reminders = express.Router();
const remindersController = require("../controllers/RemindersControllers");

reminders.get("/", remindersController.getAll);

reminders.get("/:id", remindersController.getById);

reminders.post("/", remindersController.create);

reminders.put("/:id", remindersController.update);

reminders.delete("/:id", remindersController.remove);

module.exports = RemindersRouter = reminders;
