const pool = require("../databases/pg/pool");

async function getUsersWith2AndMorePost(posts) {
  const data = await pool.query(
    `SELECT users.id, users.username, COUNT(posts.id) AS post_count FROM users JOIN posts ON users.id = posts.user_id GROUP BY users.id, users.username HAVING COUNT(posts.id) > $1`,
    [posts],
  );
  return data.rows;
}

async function getAllPostsWithAuthorName() {
  const posts = await pool.query(
    `SELECT posts.post_id, posts.title, posts.content, users.username as author_name FROM posts JOIN users ON users.id = posts.user_id`,
  );
  return posts;
}

module.exports = {
  getUsersWith2AndMorePost,
  getAllPostsWithAuthorName,
};
