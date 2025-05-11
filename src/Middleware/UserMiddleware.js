const { db } = require("../../prisma/client");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("X-Authorization");
    if (!token) {
      return res.status(401).json({ error: "token no existe" });
    }

    const result = await db.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!result) {
      return res.status(401).json({ error: "Token invalido" });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = { authenticate };
