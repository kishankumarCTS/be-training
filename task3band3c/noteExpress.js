const express = require("express");
const { randomUUID } = require("crypto");
const AppError = require("./utils/utils");

const app = express();
app.use(express.json());

const PORT = 3000;
const HOST_NAME = "localhost";
const BASE_URL = `http://${HOST_NAME}:${PORT}`;
let notes = [];
let nextId = 1;

app.use((req, res, next) => {
  const pathName = req.path;
  const method = req.method;
  const time = new Date().toLocaleString();
  console.log({ pathName, method, time });
  return next();
});

app.use((req, res, next) => {
  res.set("X-Request-Id", randomUUID());
  return next();
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.get("/notes/:id", (req, res, next) => {
  const noteId = Number(req.params.id);
  const note = notes.filter((note) => note.id === noteId)[0];
  if (!note) {
    return next(new AppError("Note not found", 404));
  }
  res.json(note);
});

app.put("/notes/:id", (req, res, next) => {
  const noteId = Number(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    const error = new AppError("Note not found", 404);
    return next(error);
  }

  const body = req.body;
  notes[noteIndex] = {
    ...notes[noteIndex],
    note: body?.note || "",
  };

  res.json({
    message: "Note updated.",
    note: notes[noteIndex],
  });
});

app.post("/notes", (req, res) => {
  const body = req.body;
  const newNote = {
    id: nextId++,
    note: body.note,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.json({
    message: "Note deleted.",
  });
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
