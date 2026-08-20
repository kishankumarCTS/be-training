const pool = require("../databases/pg/pool");

async function createTable() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
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

async function createUser(data) {
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

async function getPostsWithAuthorNameAndCommentCount(user_id) {
  try {
    const posts = await pool.query(
      ` SELECT
        posts.id,
        posts.title,
        posts.content,
        posts.created_at,
        users.username AS author_name,
        COUNT(comments.id) AS comment_count
      FROM posts
      JOIN users
        ON posts.user_id = users.id
      LEFT JOIN comments
        ON posts.id = comments.post_id
      WHERE posts.user_id = $1
      GROUP BY
        posts.id,
        posts.title,
        posts.content,
        posts.created_at,
        users.username;`,
      [user_id],
    );
    return posts.rows;
  } catch (error) {
    console.log(error);
  }
}

async function updatePostSQL(post_id, title) {
  const result = await pool.query(
    `UPDATE posts SET title=$1 WHERE id=$2 RETURNING id, title`,
    [title, post_id],
  );
  return result.rows[0];
}

module.exports = {
  createTable,
  createUser,
  createPost,
  getPostsWithAuthorNameAndCommentCount,
  updatePostSQL,
};
