const { Router } = require("express");
const { create } = require("./user.controller");
const validate = require("../../utils/validate");
const { createUserSchema } = require("./user.schema");

const router = Router();

router.post("/", validate(createUserSchema, "body"), create);

module.exports = {
  userRouter: router,
};
