const socket = require("socket.io-client")("http://localhost:3000");
const ss = require("socket.io-stream");
const fs = require("fs");
const path = require("path");

console.log(__dirname);
var filename = "./download2.zip"; // 80MB file
const template = require(path.join(
  __dirname + "/../assets/javascript/templates.js"
));

socket.on("connect", function () {
  socket.on("identify", () => {
    socket.emit("identification", { computer: process.env.COMPUTERNAME });
  });

  socket.on("broadcast", (data) => {
    console.log(data);
  });

  ss(socket).on("sinc", function (stream) {
    filename = path.resolve(__dirname + `/../scripts/h.jpg`);
    name = name;
    stream.pipe(fs.createWriteStream(filename));
    stream.on("end", function () {
      console.log("end");
    });
  });
});

function play() {
  socket.emit("play");
}
