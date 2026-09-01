const { z } = require("zod");

const registerUserSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
  username: z.string().min(1, "User name is required."),
});

const loginUserSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

const refreshTokenSchema = z.object({
  sessionId: z.string().min(1, "session id required."),
  refreshToken: z.string().min(1, "Refresh token required."),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  refreshTokenSchema,
};
