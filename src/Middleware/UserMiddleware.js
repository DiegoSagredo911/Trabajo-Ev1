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

module.exports = { authenticate };
