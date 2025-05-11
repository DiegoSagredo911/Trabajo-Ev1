const { randomUUID } = require("node:crypto");
const { db } = require("../../prisma/client");

const getAll = async (req, res) => {
  try {
    const result = await db.reminder.findMany({
      orderBy: [
        {
          important: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
    const serialized = result.map((reminder) => ({
      ...reminder,
      createdAt: Number(reminder.createdAt),
    }));

    return res.status(200).json(serialized);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

const create = async (req, res) => {
  try {
    const { content, important } = req.body;

    const data = {
      id: randomUUID(),
      content: content,
      createdAt: Date.now(),
      important: important ? important : false,
    };

    let result = await db.reminder.create({
      data,
    });
    result.createdAt = Number(result.createdAt);

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

const update = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { content, important } = req.body;

    let result = await db.reminder.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!result) {
      return res.status(404).json({
        error: "No existe el recordatorio con ese id",
      });
    }
    if (content) {
      result.content = content;
    }
    if (typeof important !== "undefined") {
      result.important = important;
    }

    const resultUpdate = await db.reminder.update({
      where: {
        id: uuid,
      },
      data: result,
    });
    resultUpdate.createdAt = Number(resultUpdate.createdAt);

    return res.status(200).json(resultUpdate);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

const remove = async (req, res) => {
  try {
    const { uuid } = req.params;

    let result = await db.reminder.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!result) {
      return res.status(404).json({
        error: "No existe el recordatorio con ese id",
      });
    }

    await db.reminder.delete({
      where: {
        id: uuid,
      },
    });

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
