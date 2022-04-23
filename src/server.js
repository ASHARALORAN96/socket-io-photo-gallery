const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const { dirPath, getImageFromFolder } = require("./helper");

const port = process.env.PORT || 5050;
const app = express();
const server = app.listen(port);
const io = socket(server);

// Express middlewares
app.use(cors());
app.use(express.static("public"));

const ImagesArr = getImageFromFolder(dirPath).sort((a, b) => a - b);
let index;

// keep increaseing the index
function callInterval() {
  setInterval(() => {
    index++;
    if (index === ImagesArr.length) index = 0;
  }, 2000);
}

// --- Socket events ---//
io.on("connection", (socket) => {
  if (index === undefined) {
    index = 0;
    callInterval();
  }
  setInterval(() => {
    socket.emit("renderImg", ImagesArr[index]);
  });
});
