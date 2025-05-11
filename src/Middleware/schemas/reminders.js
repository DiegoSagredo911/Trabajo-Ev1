const v = require("valibot");

const create = v.object({
  content: v.optional(
    v.string([
      v.minLength(1, "Content no puede estar vacío."),
      v.maxLength(120, "Content no puede ser mayor a 120 caracteres."),
    ])
  ),
  important: v.optional(v.boolean()),
});

const update = v.object({
  content: v.optional(
    v.string([
      v.minLength(1, "Content no puede estar vacío."),
      v.maxLength(120, "Content no puede ser mayor a 120 caracteres."),
    ])
  ),
  important: v.optional(v.boolean()),
});

const params = v.object({
  uuid: v.string([v.uuid("uuid no es valido")]),
});

module.exports = { create, update, params };
