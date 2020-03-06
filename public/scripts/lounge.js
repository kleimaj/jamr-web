// Menu Toggle Script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

// Socket connection
const socket = io.connect('http://localhost:4000');
console.log(socket);

const name = localStorage.getItem('artistName');

// Online container
const messageForm = document.getElementById('send-container');
const messageInput =document.getElementById('message-input');
const chatroom = document.querySelector('.chatroom');
const onlineContainer = document.querySelector('#sidebar-wrapper');
connection(`Welcome, ${name}`);


// Socket channels
socket.emit('onlineUser', name);

socket.on('userConnected', name => {
  connection(`${name} joined`);
});

socket.on('userDisconnected', name => {
  connection(`${name} left`);
});

socket.on('chatMessage', (res) => {
  addMessage(`${res.name}: ${res.message}`);
});


// Event Listeners
messageForm.addEventListener('submit', event => {

  event.preventDefault();
  let message = messageInput.value;

  // addMessage(`You sent: ${message}`);

  // Sents data back to our server.
  socket.emit('sendMessage', message);

  // Clears input field after being sent.
  messageInput.value = null;

});

function connection(name){ 
  let connected = `
  <a href="#" class="list-group-item list-group-item-action bg-light">
  ${name}
  </a>`

  onlineContainer.insertAdjacentHTML('beforeend', connected);
}

function addMessage(message){ 
  let messageElement = `<div>${message}</div>`

  chatroom.insertAdjacentHTML('beforeend', messageElement);
}

