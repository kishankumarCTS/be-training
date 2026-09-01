const { ERROR_CODES } = require("../../utils/errors");
const {
  loginUserSchema,
  registerUserSchema,
  refreshTokenSchema,
} = require("./auth.schema");
const {
  loginUser,
  registerUser,
  rotateRefreshToken,
} = require("./auth.service");

async function login(req, res, next) {
  try {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid request",
        400,
        result.error.issues.map((item) => item.message),
      );
    }

    const { refreshToken, sessionId, token } = await loginUser(result.data);

    return res.status(200).json({
      message: "login successful",
      data: { refreshToken, sessionId, token },
    });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const result = registerUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid request",
        400,
        result.error.issues.map((item) => item.message),
      );
    }

    const user = registerUser(result.data);

    return res.status(200).json({
      message: "User account created",
      data: "",
    });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const result = refreshTokenSchema.safeParse(req.body);
    const { refreshToken, sessionId, token } = await rotateRefreshToken(
      result.data,
    );
    return res.status(200).json({
      message: "login successful",
      data: { refreshToken, sessionId, token },
    });
  } catch (error) {}
}

module.exports = {
  login,
  register,
  refreshToken,
};
