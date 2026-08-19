const pool = require("../databases/pg/pool");

async function getUserWithPosts(user_id) {
  const data = await pool.query(
    `SELECT users.id AS user_id, users.username, users.email, posts.id AS post_id, posts.title, posts.content
     FROM usres JOIN posts ON user.id = posts.user_id WHERE users.id = $1;
    `,
    [user_id],
  );
  return data.rows;
}

module.exports = {
  getUserWithPosts,
};
