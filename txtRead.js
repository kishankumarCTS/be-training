const fs = require("fs/promises");
const path = require("path");

async function getTextFiles() {
  try {
    const files = await fs.readdir(__dirname);

    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    const filePromises = textFiles.map((fileName) =>
      fs.readFile(path.join(__dirname, fileName), "utf-8"),
    );
    const resolvedPromises = await Promise.all(filePromises);
    const combinedContent = resolvedPromises.join("\r\n");
    const destinationPath = path.join(__dirname, "combined.txt");
    await fs.writeFile(destinationPath, combinedContent, "utf-8");
  } catch (err) {
    console.error("Error reading directory:", err.message);
  }
}

getTextFiles();
