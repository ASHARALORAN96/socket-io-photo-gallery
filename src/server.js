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
const interval = 2000;
let index;

// keeping increase the index
function callInterval() {
  setInterval(() => {
    index++;
    if (index === 13) index = 0;
  }, interval);
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
