//imports
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;
//tell express where the static files are
app.use(express.static(path.join(__dirname, "public")));

//when a new client connects
io.on("connection", (socket) => {
    console.log("got a new client");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});