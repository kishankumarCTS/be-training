const fs = require("fs");
const path = require("path");
const readline = require("readline");
const [, , filePath, rawFilter] = process.argv;
const filter = rawFilter.split("=")[0];
const filterValue = rawFilter.split("=")[1];

const resolvedPath = path.resolve(filePath);
console.log(resolvedPath);
const csvFileStream = fs.createReadStream(resolvedPath);

const rl = readline.createInterface({
  input: csvFileStream,
  crlfDelay: Infinity,
});

let csvHeaders = [];
const csvTableData = [];
let isFirstLine = true;

rl.on("line", (line) => {
  if (isFirstLine) {
    csvHeaders = line.split(",");
    isFirstLine = false;
  } else {
    csvTableData.push(line.split(","));
  }
});

rl.on("close", () => {
  const filterIndex = csvHeaders.findIndex(
    (item) => item.trim().toLowerCase() === filter.trim().toLowerCase(),
  );

  if (filterIndex === -1) {
    console.error(`Column "${filter}" not found.`);
    return;
  }

  const filteredData = csvTableData.filter(
    (row) => row[filterIndex] === filterValue,
  );

  const outputFilePath = path.join(__dirname, "filtered.csv");
  const outputStream = fs.createWriteStream(outputFilePath);

  outputStream.write(csvHeaders.join(",") + "\n");

  filteredData.forEach((row) => {
    outputStream.write(row.join(",") + "\n");
  });

  outputStream.end();

  outputStream.on("finish", () => {
    console.log("filtered.csv created successfully.");
  });

  outputStream.on("error", (err) => {
    console.error("Error writing file:", err.message);
  });
});

csvFileStream.on("error", (error) => {
  console.error("Error reading file:", error.message);
});
