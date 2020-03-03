console.log('connected...');

const socket = io.connect('http://localhost:4000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput =document.getElementById('message-input');
const chatBtn = document.querySelector('.chatBtn');

const name = prompt('What is your artistName?');
addMessage(`Welcome, ${name}`);

// Socket channels
socket.emit('newUser', name);

// unqiue user chatroom
socket.emit('join', {name});

socket.on('chatMessage', (res) => {
    console.log(res);
    addMessage(`${res.name}: ${res.message}`);
});

socket.on('userConnected', name => {
    addMessage(`${name} connected`);
});

socket.on('userDisconnected', name => {
    addMessage(`${name} disconnected`);
});

// Event Listeners
messageForm.addEventListener('submit', event => {

    event.preventDefault();
    let message = messageInput.value;

    addMessage(`You sent: ${message}`);

    // Sents data back to our server.
    // socket.emit('sendMessage', message);
    socket.emit('sendMessage', message);

    // Clears input field after being sent.
    messageInput.value = null;

});

function addMessage(message){ 
    let messageElement = `<div>${message}</div>
    <button class='chatBtn'> Chat with me </button>`;

    messageContainer.insertAdjacentHTML('beforeend', messageElement);
}