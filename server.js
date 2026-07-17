require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

app.get("/api/hit-5-api", async (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
