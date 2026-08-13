const pool = require("./pool.js");

async function createTable() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_posts_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);

    // Comments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_comments_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_comments_post
          FOREIGN KEY (post_id)
          REFERENCES posts(id)
          ON DELETE CASCADE
      )
    `);

    console.log("Blog database tables created successfully");
  } catch (error) {
    console.error("Database error:", error);
  }
}

async function insertUser(data) {
  const { username, email, password } = data;
  try {
    const user = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, password],
    );
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
}

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

module.exports = {
  createTable,
  insertUser,
  createPost,
  getMyPosts,
  addComment,
};
