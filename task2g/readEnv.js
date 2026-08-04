const dotenv = require("dotenv");

const envIndex = process.argv.indexOf("-env");
const env = envIndex !== -1 ? process.argv[envIndex + 1] : "development";

dotenv.config({
  path: `.env.${env}`,
});

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_URL:", process.env.DB_URL);
