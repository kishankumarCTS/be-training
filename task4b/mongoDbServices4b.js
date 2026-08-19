const Post = require("../databases/mongodb/models/Post");

// CREATE
async function createPostMongodb(data) {
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
async function getPostsMongodb() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// GET ONE POST
async function getPostMongodb(id) {
  try {
    const post = await Post.findById(id);

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updatePostMongodb(id, data) {
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
async function deletePostMongodb(id) {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteAllPostsMongodb() {
  try {
    const post = await Post.deleteMany({});
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createPostMongodb,
  getPostsMongodb,
  getPostMongodb,
  updatePostMongodb,
  deletePostMongodb,
  deleteAllPostsMongodb,
};
