const { z } = require("zod");

const createUserSchema = z.object({
  username: z.string().min(1, "Title is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

module.exports = {
  createUserSchema,
};
