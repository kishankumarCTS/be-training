require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
