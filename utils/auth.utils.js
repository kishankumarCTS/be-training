const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// Hashing a password
async function hashPassword(plainText) {
  const hash = await bcrypt.hash(plainText, saltRounds);
  return hash;
}

// Verifying a password
async function verifyPassword(plainText, storedHash) {
  const match = await bcrypt.compare(plainText, storedHash);
  return match;
}

// Generate a Token
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
}

// Verify and Decode a Token (Middleware Example)
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
};
