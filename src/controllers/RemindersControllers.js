const { randomUUID } = require("node:crypto");
let reminders = require("../db/remindersDB");

const getAll = (req, res) => {
  try {
    const sorted = [...reminders].sort((a, b) =>
      a.important !== b.important
        ? b.important - a.important
        : a.createdAt - b.createdAt
    );
    return res.status(200).json(sorted);
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

const create = (req, res) => {
  try {
    const { content, important } = req.body;

    const reminder = {
      id: randomUUID(),
      content: content,
      createdAt: Date.now(),
      important: important,
    };
    reminders.push(reminder);
    let output = {
      id: reminder.id,
      content: reminder.content,
      createdAt: reminder.createdAt,
      important: reminder.important,
    };

    return res.status(201).send(output);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

const update = (req, res) => {
  try {
    const { id } = req.params;
    const { content, important } = req.body;

    const remindersUser = reminders.find((u) => u.id === id);

    if (!remindersUser) {
      return res.status(404).json({
        error: "No existe el recordatorio con ese id",
      });
    }
    if (content != undefined) {
      remindersUser.content = content;
    }
    if (important != undefined) {
      remindersUser.important = important;
    }
    let output = {
      id: remindersUser.id,
      content: remindersUser.content,
      createdAt: remindersUser.createdAt,
      important: remindersUser.important,
    };

    return res.status(200).json(output);
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

const remove = (req, res) => {
  try {
    const { id } = req.params;

    const existe = reminders.find((u) => u.id === id);

    if (!existe) {
      return res.status(404).json({
        error: "No existe el recordatorio con ese id",
      });
    }

    reminders = reminders.filter((u) => !(u.id === id));

    return res.status(204).json({ message: "Recordatorio eliminado" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = remindersController = {
  getAll,
  create,
  update,
  remove,
};
