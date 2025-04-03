const express = require("express");
const RemindersRouters = require("./src/routers/RemindersRouters");
const authenticate = require("./src/Middleware/UserMiddleware");
const PublicRouters = require("./src/routers/PublicRouters");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/reminder", authenticate, RemindersRouters);

app.use("/api/auth", PublicRouters);

app.use("/*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`escuchando en puerto ${port}`);
});
