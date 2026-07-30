import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Recreate __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
