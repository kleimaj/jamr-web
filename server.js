// Require Statements
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const PORT = process.env.PORT || 4000;
let msg = 'socketTest';
// Socket.io users

// Lounge room users
const activeUsers = {};

// Init Routes
const routes = require('./routes'); // Routes Module

// Init server
const app = express();

// ------------------- MIDDLEWARE

// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// Init BodyParser
app.use(bodyParser.json());

// ------------------- VIEW ROUTES

app.use('/', routes.views);

// ------------------- API ROUTES

app.use('/api/v1', routes.api);

// API ERROR 404
app.use('/api/*', (req, res) => {
  res.status(404).json({status: 404, error: "Error 404: Resource Not Found"});
});

// HTML Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Page Not Found</h2>');
});

// ------------------ START SERVER

const server = app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// Sockets ---------------------------------------------------------------

// Init Socket.io
const io = require("socket.io")(server);

// Listens for every new connection.
io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.on, takes two parameters
    // 1: a variable to be used in the frontend JavaScript file.
    // 2: a callback to "respond" with data to the cilent.
    // Simply put, this method recieves data sent from every connection.

    // socket.on('newUser', name => {
    //     activeUsers[socket.id] = name;
    //     // users[name] = socket.id;
    //     console.log(`Users: ${users}`);
    //     // Sends data back to all clients, except the sender
    //     socket.broadcast.emit('userConnected', name);
    // });

    socket.on('onlineUser', name => {
        console.log(name);
        activeUsers[socket.id] = name;
        socket.broadcast.emit('userConnected', name);
    });

    socket.on('loggedOn', id => {
        onlineUsers[socket.id] = id;
      
        console.log(`Online: ${onlineUsers}`);
        // Sends data back to all clients, except the sender
        socket.broadcast.emit('online', msg);
    });

    socket.on('join', function (data) {
        console.log(data);
        console.log(data.name);
        socket.join(data.name); // We are using room of socket io
        io.sockets.in(data.name).emit('newMsg', {msg: 'hello'});
      });

    

    socket.on('sendMessage', message => {
        console.log(message);

            // Sends data back to all clients, except the sender
            socket.broadcast.emit('chatMessage',{
                message: message, 
                name: activeUsers[socket.id]
            });
         
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', activeUsers[socket.id]);
        delete activeUsers[socket.id]; 
    });

});
