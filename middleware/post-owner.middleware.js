const { prisma } = require("../prisma/prisma-client");

async function requirePostOwnerOrAdmin(req, res, next) {
  const id = req.params.post_id;
  const user = req.user;
  try {
  } catch (error) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (req.user.role === "admin" || post.user_id === req.user.user_id) {
      return next();
    }

    return res.status(403).json({
      message: "You can only modify your own posts",
    });
  }
}

module.exports = {
  requirePostOwnerOrAdmin,
};
