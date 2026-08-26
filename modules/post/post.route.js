const { Router } = require("express");
const { create, update, get } = require("./post.controller");
const validate = require("../../utils/validate");
const { createPostSchema, updatePostSchema } = require("./post.schema");

const router = Router();

router.post("/", validate(createPostSchema, "body"), create);
router.put("/:post_id", validate(updatePostSchema, "param"), update);
router.get("/", get);

module.exports = {
  postRouter: router,
};
