const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchAllPostsWithAutorNamePrisma() {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
}

module.exports = {
  fetchAllPostsWithAutorNamePrisma,
};
