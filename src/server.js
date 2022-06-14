require('dotenv').config();

const express = require("express");
const socket = require("socket.io");
const http = require('http')
const fs= require('fs')
const { dirPath, getImageFromFolder } = require("./helper");
const port = process.env.PORT || 5050;
const indexRoute = require('./router')

const app = express();
const server = http.createServer(app);
const io = socket(server , {
  cors: { origin: "*" }
});

// Express middlewares
app.use(indexRoute)
app.use(express.static("public"));

const ImagesArr = getImageFromFolder(dirPath).sort((a, b) => a - b);
let interval, index;

// keep increaseing the index
function callInterval() {
  interval = setInterval(() => {
    index++;
    if (index === ImagesArr.length) index = 0;
  }, 2000);
}

io.on("connection", (socket) => {
  console.log('new connection')
  if (index === undefined) {
    index = 0;
    callInterval();
}
  const socketInterval = setInterval(() => {
    let base64Img = fs.readFileSync(`public/assets/${ImagesArr[index]}`, "base64");
    socket.emit("renderImg", base64Img);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));


