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

        // Broadcast the message to all connected clients except the sender
        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Ensure the message is sent as a string
            }
        }

        // Automated responses
        const lowerCaseMessage = message.toString().toLowerCase();

        // List of greetings
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon'];
        const weatherKeywords = ['weather', 'rain', 'sunny', 'cloudy', 'storm', 'forecast'];
        const dayKeywords = ['your day', 'how is your day', 'what about your day'];
        const hobbiesKeywords = ['hobbies', 'interests', 'what do you like'];
        const petsKeywords = ['pets', 'animals', 'do you have pets'];

        // Random response generator
        const getRandomResponse = (responses) => responses[Math.floor(Math.random() * responses.length)];

        // Check if the message contains any greetings
        if (greetings.some((greeting) => lowerCaseMessage.includes(greeting))) {
            const responses = [
                'Hi there! How can I help you?',
                'Hello! What’s on your mind today?',
                'Hey! Let’s chat. What would you like to talk about?',
                'Good to see you! How can I assist you today?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (lowerCaseMessage.includes('how are you')) {
            const responses = [
                'I am just a server, but I am doing great! How about you?',
                'I’m doing well, thank you! How are you?',
                'I’m here and ready to chat! How are you feeling today?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (weatherKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            const responses = [
                'The weather is always a great topic! Is it sunny or rainy where you are?',
                'I love talking about the weather. What’s it like outside today?',
                'Is it warm or cold where you are? Let’s talk about it!',
                'Weather can be so unpredictable! What’s it like in your area?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (dayKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            const responses = [
                'My day has been great! I’ve been chatting with people like you. How has your day been?',
                'I’ve had a busy day responding to messages! How about you?',
                'My day is going well, thank you for asking! What about yours?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (hobbiesKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            const responses = [
                'I love learning about people’s hobbies! What are some of your favorite hobbies or interests?',
                'Hobbies are so fun! Do you enjoy sports, reading, or something else?',
                'Tell me about your hobbies! I’d love to hear about them.'
            ];
            ws.send(getRandomResponse(responses));
        } else if (petsKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            const responses = [
                'Pets are amazing! Do you have any pets? If so, what kind of pets do you have?',
                'I love animals! Do you have a dog, cat, or something else?',
                'Pets bring so much joy! Tell me about your furry (or scaly) friends.'
            ];
            ws.send(getRandomResponse(responses));
        } else if (lowerCaseMessage.includes('bye')) {
            const responses = [
                'Goodbye! Have a great day!',
                'See you later! Take care!',
                'Bye! It was nice chatting with you!'
            ];
            ws.send(getRandomResponse(responses));
        } else {
            const responses = [
                'I am not sure how to respond to that. Try saying "hello"!',
                'Hmm, I didn’t quite get that. Let’s talk about weather, your day, hobbies, or pets!',
                'I’m here to chat! What would you like to talk about?'
            ];
            ws.send(getRandomResponse(responses));
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');