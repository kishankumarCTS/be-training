const { prisma } = require("../../prisma/prisma-client");
const {
  verifyPassword,
  generateToken,
  hashPassword,
} = require("../../utils/auth.utils");
const { ERROR_CODES, AppError } = require("../../utils/errors");
const { randomUUID, createHash } = require("node:crypto");

async function loginUser(data) {
  const email = data.email.trim().toLowerCase();
  const { password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new AppError(
      ERROR_CODES.UNAUTHORIZED,
      "Email or password was incorrect.",
      401,
    );
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  const { refreshToken, tokenHash } = generateRefreshToken(user);
  const sessionId = randomUUID();

  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 7);

  prisma.refreshToken.create({
    data: {
      expireAt,
      refreshToken: tokenHash,
      sessionId,
      user_id: user.id,
    },
  });

  return { token, refreshToken, sessionId };
}

async function registerUser(data) {
  const { email } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new AppError(
      ERROR_CODES.CONFLICT,
      "User already exists with this email.",
      409,
    );
  }

  const passwordHash = hashPassword(data.password);

  const newUser = await prisma.user.create({
    data: { ...data, password: passwordHash },
  });
  return newUser;
}

async function rotateRefreshToken(data) {
  const { refreshToken, sessionId } = data;

  const refreshTokenHash = createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const refreshTokenData = await prisma.refreshToken.findFirst({
    where: {
      refreshToken: refreshTokenHash,
      sessionId,
    },
  });

  if (!refreshTokenData) {
    throw new AppError(ERROR_CODES.UNAUTHORIZED, "Unauthorized access.", 401);
  }

  // Token reuse detected
  if (refreshTokenData.revokedAt) {
    await prisma.refreshToken.updateMany({
      where: {
        sessionId,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    throw new AppError(ERROR_CODES.UNAUTHORIZED, "Unauthorized access.", 401);
  }

  // Token expired
  if (refreshTokenData.expireAt <= new Date()) {
    throw new AppError(ERROR_CODES.UNAUTHORIZED, "Refresh token expired.", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: refreshTokenData.user_id,
    },
  });

  if (!user) {
    throw new AppError(ERROR_CODES.UNAUTHORIZED, "Unauthorized access.", 401);
  }

  const accessToken = generateToken(user);

  const newRefreshToken = generateRefreshToken(user);

  const newTokenHash = createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 7);

  await prisma.$transaction(async (tx) => {
    // Revoke old token
    await tx.refreshToken.update({
      where: {
        id: refreshTokenData.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    // Create new token
    await tx.refreshToken.create({
      data: {
        sessionId,
        refreshToken: newTokenHash,
        expireAt,
        user_id: user.id,
      },
    });
  });

  return {
    token: accessToken,
    refreshToken: newRefreshToken,
    sessionId,
  };
}

function generateRefreshToken(user) {
  const refreshToken = randomUUID() + user.id;
  const tokenHash = createHash("sha256").update(refreshToken).digest("hex");
  return {
    refreshToken,
    tokenHash,
  };
}

module.exports = {
  loginUser,
  registerUser,
  rotateRefreshToken,
};
