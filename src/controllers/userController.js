const { db } = require("../../prisma/client");

const Logout = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await db.user.findUnique({
      where: {
        token: token,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    user.token = null;
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  Logout,
};
