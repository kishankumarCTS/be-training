const pool = require("../databases/pg/pool");

async function createPost(data) {
  const { title, content, user_id } = data;
  try {
    const post = await pool.query(
      `INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, user_id, created_at`,
      [user_id, title, content],
    );
    return post.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getMyPosts(id) {
  const posts = await pool.query(
    `SELECT id, title, content, created_at FROM posts WHERE user_id = $1 ORDER BY created_at DESC`,
    [id],
  );
  return posts.rows;
}

async function addComment(data) {
  const { user_id, post_id, content } = data;
  try {
    const comment = await pool.query(
      `INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING id, user_id, post_id, created_at`,
      [user_id, post_id, content],
    );
    return comment.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getUserWithPostId(post_id) {
  const data = await pool.query(
    `SELECT users.id AS user_id, users.username, users.email, posts.id AS post_id FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1;
    `,
    [post_id],
  );
  return data.rows;
}

module.exports = {
  createPost,
  getMyPosts,
  addComment,
  getUserWithPostId,
};
