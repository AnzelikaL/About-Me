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

        // Function to simulate a typewriter effect with a "Typing..." indicator
        const sendWithTyping = (ws, response, typingDelay = 1000, typewriterSpeed = 50) => {
            // Send "Typing..." indicator
            ws.send('Typing...');

            // Wait for the typing delay before starting the typewriter effect
            setTimeout(() => {
                let index = 0;

                // Send the response character by character
                const typewriterInterval = setInterval(() => {
                    if (index < response.length) {
                        const currentText = response.slice(0, index + 1); // Get the substring up to the current index
                        ws.send(JSON.stringify({ type: 'update', text: currentText })); // Send the updated text
                        index++;
                    } else {
                        clearInterval(typewriterInterval); // Stop the interval when the full response is sent
                        ws.send(JSON.stringify({ type: 'done', text: response })); // Indicate the response is complete
                    }
                }, typewriterSpeed); // Delay between each character
            }, typingDelay); // Delay before starting the typewriter effect
        };

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
        const foodKeywords = ['food', 'eat', 'hungry', 'favorite food', 'cuisine'];
        const musicKeywords = ['music', 'song', 'band', 'listen to', 'favorite music'];

        // Check if the message contains any greetings
        if (greetings.some((greeting) => lowerCaseMessage.includes(greeting))) {
            console.log('Greeting detected!');
            const responses = [
                'Hi there! I can chat about a variety of topics. Try asking about "weather," "your day," "hobbies," "pets", "food", or "music."',
                'Hello! Let’s talk about something fun. You can ask me about "weather," "your day," "hobbies," "pets", "food", or "music."',
                'Hey! I’d love to chat. Here are some topics we can discuss: "weather," "your day," "hobbies," "pets", "food", or "music."',
                'Good to see you! We can talk about "weather," "your day," "hobbies," "pets", "food", or "music." What would you like to start with?'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (sunnyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Sunny weather detected!');
            const responses = [
                'Ah, sunny weather! That sounds glorious. I hope you’re soaking up the sunshine and enjoying the warmth.',
                'Sunny days are the best! Is it one of those picture-perfect days, or are you just relieved it’s not raining?',
                'Oh, I’m officially jealous—it’s all clouds here in my virtual world!'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (rainyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Rainy weather detected!');
            const responses = [
                'Rainy days can be so cozy! Are you enjoying the sound of the rain, or is it just a nuisance today?',
                'I hope you’ve got a good book or a warm drink to enjoy while it’s raining!',
                'Rain can be refreshing, but I hope it clears up soon if you’re not a fan!'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (cloudyKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Cloudy weather detected!');
            const responses = [
                'Cloudy skies can be calming. Are you enjoying the cooler weather?',
                'Gray skies can be a bit gloomy, but they make sunny days feel even more special!',
                'Cloudy days are perfect for staying in and relaxing. What are you up to today?'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (weatherKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('General weather topic detected!');
            const responses = [
                'The weather is always a great topic! Is it sunny or rainy where you are?',
                'I love talking about the weather. What’s it like outside today?',
                'Is it warm or cold where you are? Let’s talk about it!',
                'Weather can be so unpredictable! What’s it like in your area?'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (dayKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Day topic detected!');
            const responses = [
                'My day has been great! I’ve been chatting with people like you. How has your day been?',
                'I’ve had a busy day responding to messages! How about you?',
                'My day is going well, thank you for asking! What about yours?'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (hobbiesKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Hobbies topic detected!');
            const responses = [
                'I love learning about people’s hobbies! What are some of your favorite hobbies or interests?',
                'Hobbies are so fun! Do you enjoy sports, reading, or something else?',
                'Tell me about your hobbies! I’d love to hear about them.'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (petsKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            console.log('Pets topic detected!');
            const responses = [
                'Pets are amazing! Do you have any pets? If so, what kind of pets do you have?',
                'I love animals! Do you have a dog, cat, or something else?',
                'Pets bring so much joy! Tell me about your furry (or scaly) friends.'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (lowerCaseMessage.includes('bye')) {
            console.log('Goodbye detected!');
            const responses = [
                'Goodbye! Have a great day!',
                'See you later! Take care!',
                'Bye! It was nice chatting with you!'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (foodKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            context.topic = 'food';
            const responses = [
                'Ooh, food is always a fun topic! What’s your favorite dish?',
                'I love talking about food — are you craving anything right now?',
                'Are you into cooking or more of a takeout person? 😄'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (musicKeywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            context.topic = 'music';
            const responses = [
                'Music is such a vibe! What kind of music do you enjoy?',
                'Got a favorite artist or band?',
                'Do you like chill beats or something more energetic?'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        } else if (context.topic === 'food') {
            if (lowerCaseMessage.includes('pizza')) {
                sendWithTyping(ws, 'Pizza is such a classic! Do you like thin crust or deep dish?',  1000, 50); // 1-second delay, 50ms per character
            } else if (lowerCaseMessage.includes('sushi')) {
                sendWithTyping(ws, 'Yum, sushi! Do you prefer rolls or sashimi?',  1000, 50); // 1-second delay, 50ms per character
            } else {
                sendWithTyping(ws, 'Food talk always makes me hungry. Got any other favorites?',  1000, 50); // 1-second delay, 50ms per character
            }
        } else if (context.topic === 'music') {
            if (lowerCaseMessage.includes('rock')) {
                sendWithTyping(ws, 'Rock on! Do you like classic rock or more modern styles?',  1000, 50); // 1-second delay, 50ms per character
            } else if (lowerCaseMessage.includes('pop')) {
                sendWithTyping(ws, 'Pop music is so catchy! Any favorite songs right now?',  1000, 50); // 1-second delay, 50ms per character
            } else {
                sendWithTyping(ws, 'Music is such a personal thing. Want to tell me more about your taste?',  1000, 50); // 1-second delay, 50ms per character
            }
        } else {
            console.log('Fallback response triggered!');
            const responses = [
                'That’s interesting! Tell me more.',
                'Hmm, not sure I caught that. Want to talk about food, music, hobbies, or pets?',
                'You’ve got me curious! Can you say that a different way?',
                'I’m always up for a chat — try asking about weather, food, music, or even how my day’s been.'
            ];
            sendWithTyping(ws, getRandomResponse(responses), 1000, 50);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');