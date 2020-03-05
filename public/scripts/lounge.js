// Menu Toggle Script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

// Socket connection
const socket = io.connect('http://localhost:4000');
console.log(socket);

const name = "localStorage.getItem('artistName');"

// Socket channels
socket.emit('onlineUser', name);
