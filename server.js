require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { postRouter } = require("./modules/post/post.route");
const { userRouter } = require("./modules/users/user.route");
const { AppError, ERROR_CODES } = require("./utils/errors");
const { verifyToken } = require("./utils/auth.utils");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.use(verifyToken);

app.use((req, res, next) => {
  next(
    new AppError(
      ERROR_CODES.NOT_FOUND,
      `Route ${req.method} ${req.originalUrl} not found`,
      404,
    ),
  );
});

// Global error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    error: {
      code: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: err.message || "Internal server error",
      details: err.details || {},
    },
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
