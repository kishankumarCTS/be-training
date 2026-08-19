const pool = require("../databases/pg/pool");

async function createUserPostTransaction(res) {
  try {
    await pool.query("BEGIN");
    const userResult = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
      ["john", "john@example.com", "abc"],
    );

    const userId = userResult.rows[0].id;

    await pool.query(
      `INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)`,
      [userId, "My First Post", "Hello!"],
    );
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
      ["another_john", "john@example.com", "abc"],
    );

    await pool.query("COMMIT");
    return "Transaction completed";
  } catch (error) {
    await pool.query("ROLLBACK");
    return error.message;
  }
}

module.exports = {
  createUserPostTransaction,
};
