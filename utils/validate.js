const { ERROR_CODES } = require("./errors");

const validate = (schema, target) => {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "_root";

        if (!errors[field]) {
          errors[field] = [];
        }

        errors[field].push(issue.message);
      });

      return next(new AppError(ERROR_CODES.BAD_REQUEST, "Invalid fields", 400));
    }

    req[target] = result.data;

    next();
  };
};

module.exports = validate;
