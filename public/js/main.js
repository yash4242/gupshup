const socket = new io();

// socket.emit emits the message, which the below function catches and logs
socket.on("message", (message) => {
    console.log(`received this: ${message}`);
});