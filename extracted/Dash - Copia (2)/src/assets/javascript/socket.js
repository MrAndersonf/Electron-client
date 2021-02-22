const io = require('socket.io-client');
const socket = io(`http://localhost:3000`);
const path = require('path')


console.log(__dirname)

const template = require(path.join(__dirname + '/../assets/javascript/templates.js'))


socket.on('welcome', () => {
  console.log('on welcome : welcome received renderer'); // displayed
  socket.emit('test')
});
socket.on('error', (e) => {
  console.log(e); // displayed ?
});
socket.on('msg', (e) => {
  $('#processAtivityTable').append(template.processTableRow(e.id, e.computer, "influu", "active"))
});
socket.on('ok', () => {
  console.log("OK received renderer"); // displayed
});
socket.on('connect', function() {
  console.log("connected renderer"); // displayed
  socket.emit('test');
});

function play() {
  socket.emit('play')
}