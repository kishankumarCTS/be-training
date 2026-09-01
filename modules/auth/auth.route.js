const { Router } = require("express");
const validate = require("../../utils/validate");
const { loginUserSchema, registerUserSchema } = require("./auth.schema");
const { login, register, refreshToken } = require("./auth.controller");
const router = Router();

router.post("/login", validate(loginUserSchema, "body"), login);
router.post("/register", validate(registerUserSchema, "body"), register);
router.post("/refresh", refreshToken);

module.exports = {
  authRouter: router,
};
