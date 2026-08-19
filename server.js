require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

app.get("/api/hit-5-api", async (req, res) => {
  res.status(200).json({ message: "hello world" });
});

// ====================== Task 4a START ========================
const {
  createTable,
  createUser,
  createPost,
  getPostsWithAuthorNameAndCommentCount,
  updatePostSQL,
} = require("./task4a/task4aServices.js");

app.post("/api/create-tables", async (req, res) => {
  await createTable();
  res.send("Created tables");
});

app.post("/api/create-user", async (req, res) => {
  const body = req.body;
  const user = await createUser(body);
  res.json(user);
});

app.post("/api/create-post", async (req, res) => {
  const body = req.body;
  const post = await createPost(body);
  res.json(post);
});

app.get("/api/get-my-posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await getPostsWithAuthorNameAndCommentCount(id);
  res.json(posts);
});

app.patch("/api/update-post/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const post = await updatePostSQL(post_id);
  res.json(post);
});

// =====================  Task 4a END ==========================

// =====================  Task 4b START ========================

const {
  createPostMongodb,
  getPostsMongodb,
  getPostMongodb,
  updatePostMongodb,
  deletePostMongodb,
  deleteAllPostsMongodb,
} = require("./task4b/mongoDbServices4b.js");

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

app.delete("/api/4g/delete-all", async (req, res) => {
  const posts = await deleteAllPosts();
  res.json({ message: "All posts deleted." });
});

// =====================  Task 4b END  =========================

// =====================  Task 4c START  =======================

const {
  getUsersWith2AndMorePost,
  getAllPostsWithAuthorName,
} = require("./task4c/task4cServices.js");

app.get("/api/get-all-posts", async (req, res) => {
  const posts = await getAllPostsWithAuthorName();
  res.json(posts);
});

app.get("/api/users/with-min-posts/:posts", async (req, res) => {
  const { posts } = req.params;
  const data = await getUsersWith2AndMorePost(posts);
  res.json(data);
});

// =====================  Task 4c END  =========================

// =====================  Task 4d START  =======================

const { createUserPostTransaction } = require("./task4d/task4dServices.js");
app.post("/api/transaction", async (req, res) => {
  const message = await createUserPostTransaction();
  res.send({ message });
});

// =====================  Task 4d END  =========================

// =====================  Task 4e START  =======================

const { getUserWithPosts } = require("./task4e/task4eServices.js");

app.get("/api/get-user-with-post/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const user = await getUserWithPosts(user_id);
  res.json(user);
});

// =====================  Task 4e END  =========================

// =====================  Task 4f START  =======================

const {
  fetchAllPostsWithAutorNamePrisma,
} = require("./task4f/task4fServices.js");

app.get("/api/prisma/get-all-posts", async (req, res) => {
  const posts = await fetchAllPostsWithAutorNamePrisma();
  res.json(posts);
});

//======================  EXTRAS  ==============================

app.post("/api/add-comment", async (req, res) => {
  const body = req.body;
  const comment = await addComment(body);
  res.send(comment);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
