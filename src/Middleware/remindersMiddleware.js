const remindersCorrectFormat = (req, res, next) => {
  try {
    let { content, important } = req.body;
    //si es metodo pst tiene que existir content y important
    if (req.method === "POST") {
      if (!content) {
        return res.status(400).json({ error: "Content es requerido" });
      }
      if (typeof important !== "boolean") {
        return res
          .status(400)
          .json({ error: "importan tiene que ser de tipo boolean" });
      }
    }
    let message = "";

    if (content !== undefined) {
      if (typeof content !== "string") {
        message = message + "Content debe ser un string. ";
      }
      content = content.trim();
      req.body.content = content;
      if (content.length === 0) {
        message = message + "Content no puede estar vacio. ";
      }
      if (content.length > 120) {
        message = message + "Content no puede ser mayor a 120 caracteres. ";
      }
    }

    if (important !== undefined) {
      if (typeof important !== "boolean") {
        message = message + "Important debe ser un booleano. ";
      }
    }

    if (message.length > 0) {
      return res.status(400).json({ error: message });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

const idCorrentFormat = (req, res, next) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ error: "Id no valido" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = { remindersCorrectFormat, idCorrentFormat };
