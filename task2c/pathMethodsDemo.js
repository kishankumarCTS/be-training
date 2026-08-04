const path = require("path");

const fullPath = path.join(__dirname, "2c", "testConfig.js");
const directory = path.dirname(fullPath);
const fileExtension = path.extname(fullPath);
const fullFileName = path.basename(fullPath);
const fileBaseName = path.parse(fullFileName).name;
const resolvedPath = path.resolve(__dirname, "2c", "testConfig.js");

console.log({
  resolvedPath,
  fullPath,
  directory,
  fileExtension,
  fullFileName,
  fileBaseName,
});
