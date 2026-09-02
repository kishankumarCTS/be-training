const { Router } = require("express");
const { create, update, get, deletePost } = require("./post.controller");
const validate = require("../../utils/validate");
const { createPostSchema, updatePostSchema } = require("./post.schema");
const {
  requirePostOwnerOrAdmin,
} = require("../../middleware/post-owner.middleware");
const { requireRole } = require("../../middleware/role.middleware");

const router = Router();

router.post("/", validate(createPostSchema, "body"), create);
router.put(
  "/:post_id",
  validate(updatePostSchema, "param"),
  requirePostOwnerOrAdmin,
  update,
);
router.get("/", get);
router.delete("/:post_id", requireRole("admin"), deletePost);

module.exports = {
  postRouter: router,
};
