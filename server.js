const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// Handle new connections
wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`); // Log the message in the terminal

        // Broadcast the message to all connected clients
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Ensure the message is sent as a string
            }
        }

        // Automated responses
        const lowerCaseMessage = message.toString().toLowerCase();
        if (lowerCaseMessage.includes('hello')) {
            ws.send('Hi there! How can I help you?');
        } else if (lowerCaseMessage.includes('how are you')) {
            ws.send('I am just a server, but I am doing great! How about you?');
        } else if (lowerCaseMessage.includes('bye')) {
            ws.send('Goodbye! Have a great day!');
        } else {
            ws.send('I am not sure how to respond to that. Try saying "hello"!');
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');