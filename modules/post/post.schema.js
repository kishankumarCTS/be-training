const { z } = require("zod");
const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required").max("500"),
  user_id: z.number().min(1, "Author ID is required"),
});

const updatePostSchema = createPostSchema.partial();

module.exports = {
  createPostSchema,
  updatePostSchema,
};
