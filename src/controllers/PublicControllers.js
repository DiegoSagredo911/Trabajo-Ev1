const crypto = require("node:crypto");
const users = require("../db/usersDB");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error:
          "si la api no recibió username y/o password en el formato correcto",
      });
    }

    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (!user) {
      return res.status(401).json({ error: "si el usuario no existe" });
    }

    const [storedSalt, storedKey] = user.salt.split(":");

    crypto.scrypt(password, storedSalt, 64, (err, derivedKey) => {
      if (err) return res.status(500).json({ error: "Error interno" });

      if (derivedKey.toString("hex") !== storedKey) {
        return res.status(401).json({
          error: "si el usuario existe y la contraseña es incorrecta",
        });
      }

      const token = crypto.randomBytes(48).toString("hex");
      user.token = token;
      delete user.password;
      delete user.salt;
      return res.json(user);
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

const register = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
      return res
        .status(400)
        .json({ error: "username, name y password son requeridos" });
    }

    if (users.some((u) => u.username === username)) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return res.status(500).json({ error: "Error interno" });

      users.push({
        username,
        name,
        salt: `${salt}:${derivedKey.toString("hex")}`,
        token: null,
      });

      return res.json({ message: "Usuario registrado con exito" });
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = PublicControllers = {
  login,
  register,
};
