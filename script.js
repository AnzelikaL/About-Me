document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", () => {
            collapsible.classList.toggle("active");
            const content = collapsible.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // WebSocket functionality
    const ws = new WebSocket('ws://localhost:8080');

    // Handle incoming WebSocket messages
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'update') {
            // Update the same line with the current text
            document.getElementById('chat-response').innerText = data.text;
        } else if (data.type === 'done') {
            // Finalize the response (optional)
            console.log('Response complete:', data.text);
        }
    };

    // Optional: Handle WebSocket connection open
    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    // Optional: Handle WebSocket errors
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Optional: Handle WebSocket connection close
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
});