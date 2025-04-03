const users = require("../db/usersDB");
const authenticate = (req, res, next) => {
  const token = req.header("X-Authorization");
  if (!token) {
    return res.status(401).json({ error: "token no existe" });
  }

  const user = users.find((u) => u.token === token);
  if (!user) {
    return res.status(401).json({ error: "Token invalido" });
  }

  next();
};

module.exports = authenticate;
