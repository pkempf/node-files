const fs = require("fs");
const process = require("process");

function cat(filePath) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${filePath}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

cat(process.argv[2]);
