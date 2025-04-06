const crypto = require("node:crypto");
const users = require("../db/usersDB");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const [storedSalt, storedKey] = user.password.split(":");

    crypto.scrypt(password, storedSalt, 64, (err, derivedKey) => {
      if (err) return res.status(500).json({ error: "Error interno" });

      if (derivedKey.toString("hex") !== storedKey) {
        return res.status(401).json({
          error: "contraseña es incorrecta",
        });
      }

      const token = crypto.randomBytes(48).toString("hex");
      user.token = token;

      let output = {
        username: user.username,
        name: user.name,
        token: user.token,
      };
      return res.json(output);
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = PublicControllers = {
  login,
};
