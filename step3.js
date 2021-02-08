const fs = require("fs");
const process = require("process");
const axios = require("axios");

function doOutput(target, content) {
  if (target) {
    fs.writeFile(target, content, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${target}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

function cat(filePath, target) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${filePath}: ${err}`);
      process.exit(1);
    } else {
      doOutput(target, data);
    }
  });
}

async function webCat(url, target) {
  try {
    let resp = await axios.get(url);
    doOutput(target, resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let argPath;
let target;

if (process.argv[2] === "--out") {
  target = process.argv[3];
  argPath = process.argv[4];
} else {
  target = "";
  argPath = process.argv[2];
}

if (argPath.slice(0, 4) === "http") {
  webCat(argPath, target);
} else {
  cat(argPath, target);
}
