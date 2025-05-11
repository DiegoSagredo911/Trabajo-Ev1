const crypto = require("node:crypto");
const { db } = require("../../prisma/client");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const [storedSalt, storedKey] = user.password.split(":");

    await crypto.scrypt(password, storedSalt, 64, async (err, derivedKey) => {
      if (err) return res.status(500).json({ error: "Error interno" });

      if (derivedKey.toString("hex") !== storedKey) {
        return res.status(401).json({
          error: "contraseña es incorrecta",
        });
      }
      const token = crypto.randomBytes(48).toString("hex");
      user.token = token;
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: token,
        },
      });

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
