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
  uuid: v.string([v.uuid("uuid no es valido")]),
  content: v.optional(
    v.string([
      v.minLength(1, "Content no puede estar vacío."),
      v.maxLength(120, "Content no puede ser mayor a 120 caracteres."),
    ])
  ),
  important: v.optional(v.boolean()),
});

//validar params uuid u que sea un uuid
const remove = v.object({
  uuid: v.string([v.uuid("uuid no es valido")]),
});

module.exports = { create, update, remove };
