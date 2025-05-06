const { safeParse } = require("valibot");

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = safeParse(schema, req.body);

    if (!result.success) {
      const messages = result.issues.map((issue) => issue.message).join(" ");
      return res.status(400).json({ error: messages });
    }

    req.body = result.output;
    next();
  };
};

module.exports = validateBody;
