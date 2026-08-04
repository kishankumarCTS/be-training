const fs = require("fs");
const path = require("path");
const { Transform, pipeline } = require("stream");

const inputFilePath = path.join(__dirname, "first.txt");
const readable = fs.createReadStream(inputFilePath);

const outputFilePath = path.join(__dirname, "output.txt");
const writable = fs.createWriteStream(outputFilePath);

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();
    callback(null, upperCaseChunk);
  },
});

pipeline(readable, upperCaseTransform, writable, (err) => {
  if (err) {
    console.error("Pipeline failed:", err.message);
  } else {
    console.log("Pipeline completed successfully");
  }
});
