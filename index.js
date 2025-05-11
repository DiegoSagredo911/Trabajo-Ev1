const express = require("express");
const RemindersRouters = require("./src/routers/RemindersRouters");
const UserMiddleware = require("./src/Middleware/UserMiddleware");
const PublicRouters = require("./src/routers/PublicRouters");
const UserRouters = require("./src/routers/UserRouter");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/auth", PublicRouters);
app.use("/api/auth", UserMiddleware.authenticate, UserRouters);
app.use("/api/reminders", UserMiddleware.authenticate, RemindersRouters);

app.use("/*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`escuchando en puerto ${port}`);
});

module.exports = app;
