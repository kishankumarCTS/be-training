const express = require("express");
const AppError = require("./utils/utils.js");
const notesRouter = require("./controllers/notes.router.js");

const app = express();
app.use(express.json());

const PORT = 3000;
const HOST_NAME = "localhost";
const BASE_URL = `http://${HOST_NAME}:${PORT}`;

app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
