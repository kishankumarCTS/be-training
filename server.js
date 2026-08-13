require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const {
  createTable,
  insertUser,
  createPost,
  getMyPosts,
  addComment,
} = require("./task4a/tableService.js");

const {
  createPost: createPostMongo,
  getPost,
  deletePost,
  updatePost,
  getPosts,
} = require("./task4b/models/services.js");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

app.get("/api/hit-5-api", async (req, res) => {
  res.status(200).json({ message: "hello world" });
});

// ====================== Task 4a ========================
app.post("/api/create-tables", async (req, res) => {
  await createTable();
  res.send("Created tables");
});

app.post("/api/insert-user", async (req, res) => {
  const body = req.body;
  const user = await insertUser(body);
  res.json(user);
});

app.post("/api/create-post", async (req, res) => {
  const body = req.body;
  const post = await createPost(body);
  res.json(post);
});

app.get("/api/get-my-posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await getMyPosts(id);
  res.send(posts);
});

app.post("/api/add-comment", async (req, res) => {
  const body = req.body;
  const comment = await addComment(body);
  res.send(comment);
});

// ====================== Task 4b ========================

mongoose
  .connect("mongodb://localhost:27017/myblog")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.post("/api/4b/create-post", async (req, res) => {
  const { postedBy, content, title } = req.body;
  const post = await createPostMongo({ postedBy, content, title });
  res.json(post);
});
app.get("/api/4b/get-posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});
app.get("/api/4b/get-post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.json(post || [{}]);
});
app.patch("/api/4b/update-post/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedPost = await updatePost(id, data);
  res.json(updatedPost);
});
app.delete("/api/4b/delete-post/:id", async (req, res) => {
  const { id } = req.params;
  await deletePost(id);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
