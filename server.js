// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle when a user connects and sends their username
    socket.on('user-connected', (username) => {
        console.log(`${username} has joined the chat.`);
        socket.username = username;
    });

    // Handle receiving a message
    socket.on('send-message', (data) => {
        io.emit('receive-message', data);  // Broadcast the message to all clients
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        console.log(`${socket.username} has left the chat.`);
    });
});

// Set the server to listen on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
