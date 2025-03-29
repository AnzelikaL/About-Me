const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients and their context
const clients = new Map(); // Use a Map to store context for each client

// Handle new connections
wss.on('connection', (ws) => {
    // Initialize context for the new client
    clients.set(ws, { topic: null });
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`); // Log the message in the terminal

        // Get the context for the current client
        const context = clients.get(ws); // Retrieve the context for this client
        if (!context) {
            console.error('Context not found for client!');
            return;
        }

        const lowerCaseMessage = message.toString().toLowerCase();

        // Random response generator
        const getRandomResponse = (responses) => responses[Math.floor(Math.random() * responses.length)];

        // Handle follow-up responses based on context
        if (context.topic === 'weather') {
            console.log('Handling weather context...');
            if (lowerCaseMessage.includes('cold')) {
                ws.send('Brrr! Cold weather can be tough. Do you enjoy the cold, or are you more of a warm-weather person?');
            } else if (lowerCaseMessage.includes('warm')) {
                ws.send('Warm weather is so nice! Do you like spending time outdoors when it’s warm?');
            } else {
                ws.send('Weather is such an interesting topic! Is there anything else about the weather you’d like to share?');
            }
            return; // Stop further processing to stay on the current topic
        } 

        // List of greetings
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon'];
        const weatherKeywords = ['weather', 'rain', 'sunny', 'cloudy', 'storm', 'forecast'];
        const sunnyKeywords = ['sunny', 'sunshine', 'clear skies'];
        const rainyKeywords = ['rain', 'rainy', 'storm', 'drizzle'];
        const cloudyKeywords = ['cloudy', 'overcast', 'gray skies'];
        const dayKeywords = ['your day', 'how is your day', 'what about your day'];
        const hobbiesKeywords = ['hobbies', 'interests', 'what do you like'];
        const petsKeywords = ['pets', 'animals', 'do you have pets'];

        // Check if the message contains any greetings
        if (greetings.some((greeting) => lowerCaseMessage.includes(greeting))) {
            console.log('Greeting detected!');
            const responses = [
                'Hi there! I can chat about a variety of topics. Try asking about "weather," "your day," "hobbies," or "pets."',
                'Hello! Let’s talk about something fun. You can ask me about "weather," "your day," "hobbies," or "pets."',
                'Hey! I’d love to chat. Here are some topics we can discuss: "weather," "your day," "hobbies," or "pets."',
                'Good to see you! We can talk about "weather," "your day," "hobbies," or "pets." What would you like to start with?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (sunnyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Sunny weather detected!');
            const responses = [
                'Ah, sunny weather! That sounds glorious. I hope you’re soaking up the sunshine and enjoying the warmth.',
                'Sunny days are the best! Is it one of those picture-perfect days, or are you just relieved it’s not raining?',
                'Oh, I’m officially jealous—it’s all clouds here in my virtual world!'
            ];
            ws.send(getRandomResponse(responses));
        } else if (rainyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Rainy weather detected!');
            const responses = [
                'Rainy days can be so cozy! Are you enjoying the sound of the rain, or is it just a nuisance today?',
                'I hope you’ve got a good book or a warm drink to enjoy while it’s raining!',
                'Rain can be refreshing, but I hope it clears up soon if you’re not a fan!'
            ];
            ws.send(getRandomResponse(responses));
        } else if (cloudyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Cloudy weather detected!');
            const responses = [
                'Cloudy skies can be calming. Are you enjoying the cooler weather?',
                'Gray skies can be a bit gloomy, but they make sunny days feel even more special!',
                'Cloudy days are perfect for staying in and relaxing. What are you up to today?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (weatherKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('General weather topic detected!');
            const responses = [
                'The weather is always a great topic! Is it sunny or rainy where you are?',
                'I love talking about the weather. What’s it like outside today?',
                'Is it warm or cold where you are? Let’s talk about it!',
                'Weather can be so unpredictable! What’s it like in your area?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (dayKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Day topic detected!');
            const responses = [
                'My day has been great! I’ve been chatting with people like you. How has your day been?',
                'I’ve had a busy day responding to messages! How about you?',
                'My day is going well, thank you for asking! What about yours?'
            ];
            ws.send(getRandomResponse(responses));
        } else if (hobbiesKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Hobbies topic detected!');
            const responses = [
                'I love learning about people’s hobbies! What are some of your favorite hobbies or interests?',
                'Hobbies are so fun! Do you enjoy sports, reading, or something else?',
                'Tell me about your hobbies! I’d love to hear about them.'
            ];
            ws.send(getRandomResponse(responses));
        } else if (petsKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Pets topic detected!');
            const responses = [
                'Pets are amazing! Do you have any pets? If so, what kind of pets do you have?',
                'I love animals! Do you have a dog, cat, or something else?',
                'Pets bring so much joy! Tell me about your furry (or scaly) friends.'
            ];
            ws.send(getRandomResponse(responses));
        } else if (lowerCaseMessage.includes('bye')) {
            console.log('Goodbye detected!');
            const responses = [
                'Goodbye! Have a great day!',
                'See you later! Take care!',
                'Bye! It was nice chatting with you!'
            ];
            ws.send(getRandomResponse(responses));
        } else {
            console.log('Fallback response triggered!');
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