const users = require("../db/usersDB");
const authenticate = (req, res, next) => {
  try {
    const token = req.header("X-Authorization");
    if (!token) {
      return res.status(401).json({ error: "token no existe" });
    }

    const user = users.find((u) => u.token === token);

    if (!user) {
      return res.status(401).json({ error: "Token invalido" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

const correctFormat = (req, res, next) => {
  try {
    let { username, password } = req.body;
    let message = "";

    if (!username || !password) {
      return res
        .status(401)
        .json({ error: "Username y Password es requerido" });
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return res
        .status(401)
        .json({ error: "Username y Password no es un string" });
    }

    if (username.length === 0) {
      message = message + "Username no puede estar vacio. ";
    }

    if (password.length === 0) {
      message = message + "Password no puede estar vacio. ";
    }

    if (message.length > 0) {
      return res.status(400).json({ error: message });
    }

    password = password.trim();
    username = username.trim();
    req.body.username = username;
    req.body.password = password;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno" });
  }
};
module.exports = { authenticate, correctFormat };
