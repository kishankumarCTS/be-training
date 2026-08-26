const { createUserSchema } = require("./user.schema");
const { createUser } = require("./user.service");

async function create(req, res) {
  const data = req.body;
  try {
    const result = createUserSchema.safeParse(data);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.message,
      });
    }
    const user = await createUser(data);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  create,
};
