const express = require("express");
const notesRouter = express.Router();
const { randomUUID } = require("crypto");

let notes = [];
let nextId = 1;

notesRouter.use((req, res, next) => {
  const pathName = req.path;
  const method = req.method;
  const time = new Date().toLocaleString();
  console.log({ pathName, method, time });
  return next();
});

notesRouter.use((req, res, next) => {
  res.set("X-Request-Id", randomUUID());
  return next();
});

notesRouter.get("/", (req, res) => {
  res.send(notes);
});

notesRouter.get("/:id", (req, res, next) => {
  const noteId = Number(req.params.id);
  const note = notes.filter((note) => note.id === noteId)[0];
  if (!note) {
    return next(new AppError("Note not found", 404));
  }
  res.json(note);
});

notesRouter.put("/:id", (req, res, next) => {
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

notesRouter.post("/", (req, res) => {
  const body = req.body;
  const newNote = {
    id: nextId++,
    note: body.note,
  };
  notes.push(newNote);
  res.json(newNote);
});

notesRouter.delete("/:id", (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.json({
    message: "Note deleted.",
  });
});

notesRouter.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
  });
});

module.exports = notesRouter;
