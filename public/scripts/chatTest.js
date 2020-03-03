socket.on('newUser', name => {
    activeUsers[socket.id] = name;
    // Sends data back to all clients, except the sender
    socket.broadcast.emit('userConnected', name);
});

// sending to individual socketid private message
io.to(`${socketId}`).emit('chatMessage',{
    message: msg, 
    name: activeUsers[socket.id]
});


// Sends data back to all clients, except the sender
socket.broadcast.emit('chatMessage',{
    message: msg, 
    name: activeUsers[socket.id]
});


socket.on('sendMessage', message => {
    console.log(message);
    let msg = message.trim();
    console.log(` Trimmed message: ${msg}`);

      // sending to individual socketid private message
      socket.to(socket.id).emit('chatMessage',{
        message: msg, 
        name: activeUsers[socket.id]
    });
 
});

{
    message: msg, 
    name: activeUsers[socket.id]
}