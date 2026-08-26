const { prisma } = require("../../prisma/prisma-clinet");

async function createUser(data) {
  const user = await prisma.user.create({ data });
  return user;
}

module.exports = {
  createUser,
};
