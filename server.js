// // Using ES6
// import * as dotenv from "dotenv";
// import greeting from "./commonjs.mjs";
// import express from "express";
// import cors from "cors";
// import path from "path";

require("dotenv");
// Importing as commonjs
const greetingModule = require("./commonjs.cjs");

// Importing as ES6 module
// import { greeting } from "./commonjs.cjs";

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// // Using es6
// const directory = import.meta.dirname;

const directory = __dirname;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(directory, "public"))); // Serve frontend

app.get("/api/test", async (req, res) => {
  res.json({ message: "working" });
});

app.get("/api/micro-vs-macro", async (req, res) => {
  function consoleToTerminal(place) {
    console.log(`printed from ${place}`);
  }
  setTimeout(() => consoleToTerminal("SetTimeout"), 0);
  Promise.resolve().then(() => consoleToTerminal("Promise"));
  process.nextTick(() => consoleToTerminal("Process next tick"));

  res.json("Check terminal for output");
});

app.get("/api/greetings", (req, res) => {
  // // Using ES6
  // const gretingMessage = greeting("kishan");

  // Using cjs
  const gretingMessage = greetingModule.greeting("kishan");

  res.json(gretingMessage);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
