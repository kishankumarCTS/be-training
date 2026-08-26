const { ERROR_CODES, AppError } = require("../../utils/errors");
const { createPostSchema, updatePostSchema } = require("./post.schema");
const { createPost, updatePost, getPosts } = require("./post.service");

async function create(req, res, next) {
  try {
    const result = createPostSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid request",
        400,
        result.error.issues.map((item) => item.message),
      );
    }

    const post = await createPost(result.data);
    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const post_id = req.param;
  const data = req.body;
  try {
    const result = updatePostSchema(data);
    if (!result.success) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid request",
        400,
        result.error.issues.map((item) => item.message),
      );
    }

    const post = await updatePost(result.data, post_id);

    return res.status(201).json({
      message: "Post updated",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

async function get(req, res) {
  const page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  const { status, user_id, sortBy, order } = req.query;
  if (limit > 50) limit = 50;

  try {
    const { posts, total, totalPages } = await getPosts({
      page,
      limit,
      status,
      user_id,
      sortBy,
      order,
    });
    return res.status(200).json({
      data: posts,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

module.exports = {
  create,
  update,
  get,
};
