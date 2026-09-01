const { prisma } = require("../../prisma/prisma-client");

async function createUser(data) {
  const user = await prisma.user.create({ data });
  return user;
}

module.exports = {
  createUser,
};
