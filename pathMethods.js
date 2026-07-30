import path from "path";

const fullPath = path.join(import.meta.dirname, "./2c/testConfig.js");
const resolvedPath = path.resolve(import.meta.dirname, "./2c/testConfig.js");

const directory = path.dirname(fullPath);
const fileExtension = path.extname(fullPath);
const fullFileName = path.basename(fullPath);
const fileBaseName = path.parse(fullPath).name;

console.log({
  resolvedPath,
  fullPath,
  directory,
  fileExtension,
  fullFileName,
  fileBaseName,
});
