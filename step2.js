const fs = require("fs");
const process = require("process");
const axios = require("axios");

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

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let argPath = process.argv[2];

if (argPath.slice(0, 4) === "http") {
  webCat(argPath);
} else {
  cat(argPath);
}
