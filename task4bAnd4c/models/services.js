const Post = require("./Posts");

// CREATE
async function createPost(data) {
  const { postedBy, title, content } = data;

  try {
    const post = await Post.create({
      postedBy,
      title,
      content,
    });

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// GET ALL POSTS
async function getPosts() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// GET ONE POST
async function getPost(id) {
  try {
    const post = await Post.findById(id);

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updatePost(id, data) {
  const updates = {};
  if (data.title !== undefined) {
    updates.title = data.title;
  }
  if (data.content !== undefined) {
    updates.content = data.content;
  }
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// DELETE POST
async function deletePost(id) {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
