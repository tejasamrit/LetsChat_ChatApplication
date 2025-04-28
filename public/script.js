// script.js

const socket = io();
let username = '';

// Notification Sound
const notificationSound = new Audio('notification.mp3'); // Add notification.mp3 in the public folder

// Function to prompt for the username and enter the chat
function enterChat() {
    username = document.getElementById('username').value;
    if (username.trim() !== '') {
        document.getElementById('username-container').style.display = 'none';
        document.getElementById('chat-box').style.display = 'block';
        socket.emit('user-connected', username);
    }
}

// Function to send messages
function sendMessage() {
    const message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
        socket.emit('send-message', { username: username, message: message });
        document.getElementById('message-input').value = '';  // Clear input field
    }
}

// Listen for incoming messages
socket.on('receive-message', (data) => {
    const messageContainer = document.getElementById('chat-container');
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    // Check if the message is from the current user or another user
    if (data.username === username) {
        messageDiv.classList.add('my-message');
    } else {
        messageDiv.classList.add('other-message');
        notificationSound.play();  // Play notification sound
    }
    
    messageDiv.textContent = `${data.username}: ${data.message}`;
    messageContainer.appendChild(messageDiv);
    
    // Auto-scroll to the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
});
