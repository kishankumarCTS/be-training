const express = require("express");
const notesRouter = require("./controllers/notes.router.js");
const AppError = require("./utils/utils.js");

const app = express();
app.use(express.json());

const PORT = 3000;
const HOST_NAME = "localhost";
const BASE_URL = `http://${HOST_NAME}:${PORT}`;

app.use("/notes", notesRouter);

app.use((req, res, next) => {
  next(new AppError(`Not Found.`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
