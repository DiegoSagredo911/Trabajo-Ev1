const { safeParse } = require("valibot");

const validateBody = (schema) => {
  return (req, res, next) => {
    let result
 
    result = safeParse(schema, req.body);

    if (!result.success) {
      const messages = result.issues.map((issue) => issue.message).join(" ");
      return res.status(400).json({ error: messages });
    }

    req.body = result.output;
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    let result
 
    result = safeParse(schema, req.params);
     
    if (!result.success) {
      const messages = result.issues.map((issue) => issue.message).join(" ");
      return res.status(400).json({ error: messages });
    }

    req.body = result.output;
    next();
  };
};
module.exports = {validateBody, validateParams};
