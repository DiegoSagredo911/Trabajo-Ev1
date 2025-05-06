import * as v from "valibot";

const create = v.object({
  uuid: v.optional(v.string()),
  content: v.transform(
    v.string([
      v.minLength(1, "Content no puede estar vacío."),
      v.maxLength(120, "Content no puede ser mayor a 120 caracteres."),
    ]),
    (val) => val.trim()
  ),
  important: v.optional(v.nullable(v.boolean())),
});

const update = v.object({
  uuid: v.string(),
  content: v.optional(
    v.transform(
      v.string([
        v.minLength(1, "Content no puede estar vacío."),
        v.maxLength(120, "Content no puede ser mayor a 120 caracteres."),
      ]),
      (val) => val.trim()
    )
  ),
  important: v.optional(v.boolean()),
});

const remove = v.object({
  uuid: v.string(),
});

export { create, update, remove };
