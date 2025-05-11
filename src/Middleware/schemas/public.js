const v = require("valibot");

const login = v.object({
  username: v.string([v.minLength(1, "Email no puede estar vacío.")]),
  password: v.string([v.minLength(1, "Password no puede estar vacío.")]),
});

module.exports = { login };
