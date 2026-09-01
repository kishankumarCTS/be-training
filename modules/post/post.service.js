const { prisma } = require("../../prisma/prisma-client");

async function createPost(data) {
  const post = await prisma.post.create({
    data,
  });
  return post;
}

async function updatePost(data, post_id) {
  const post = await prisma.post.update({ where: { id: post_id }, data: data });
  return post;
}

async function getPosts({
  page = 1,
  limit = 10,
  status,
  user_id,
  sortBy,
  order,
}) {
  page = Number(page);
  limit = Number(limit);
  user_id = Number(user_id);
  const where = {};
  const orderBy = {};
  const skip = (page - 1) * limit;

  if (status) {
    where.status = status;
  }

  if (user_id) {
    where.user_id = user_id;
  }

  if ((order === "desc" || order === "asc") && sortBy) {
    orderBy[sortBy] = order;
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    posts,
    total,
    totalPages,
  };
}

module.exports = { createPost, updatePost, getPosts };
