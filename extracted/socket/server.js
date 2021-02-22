'use strict';
const io = require('socket.io')(3000);
const ss = require('socket.io-stream');
const fs = require('fs');

var filename = './download.jpg'; // 80MB file

io.on('connection', function(socket) {
  console.log('client connected');
  socket.on('sendmeafile', function() {
    var stream = ss.createStream();
    stream.on('end', function() {
      console.log('file sent');
    });
    ss(socket).emit('sending', stream);
    fs.createReadStream(filename).pipe(stream);
  });
});

console.log('Plain socket.io server started at port 3000');