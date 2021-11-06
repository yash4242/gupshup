//imports
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const formatMessage = require("./public/js/messages")

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;
//tell express where the static files are
app.use(express.static(path.join(__dirname, "public")));

const botName = "Gupshup";


//when a new client connects
io.on("connection", (socket) => {
    console.log("got a new client");

    socket.emit("message", formatMessage(botName,"welcome to iiit"));

    //when a new user connects, broadcast it
    //socket.emit will emit only to the client which asked it to emit
    //socket.broadcast.emit emits to everyone except the user who asked this to emit
    //io.emit will emit to everyone, including the client who asked it to emit
    socket.broadcast.emit("message", formatMessage(botName, "someone has joined!"));

    //when someone disconnects, do the following:
    socket.on("disconnect", () => {
        io.emit("message", "someone has left the chat");
    });

    //broadcasting a usual chat message
    socket.on("chatMessage", (msgRecvd) => {
        io.emit("message", formatMessage("someone", msgRecvd));
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

