//imports
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const formatMessage = require("./public/js/messages")
const {userJoin, getUser, userLeft, getUsersOfRoom} = require("./public/js/users")


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000;
//tell express where the static files are
app.use(express.static(path.join(__dirname, "public")));

const botName = "Gupshup Mod";

//when a new user connects, broadcast it
//socket.emit will emit only to the client which asked it to emit
//socket.broadcast.emit emits to everyone except the user who asked this to emit
//io.emit will emit to everyone, including the client who asked it to emit

//when a new client connects
io.on("connection", (socket) => {
    socket.on("joinRoom", ({username, room}) =>{
        var user = userJoin(socket.id, username, room);
        socket.join(user.room); // joining the user to that room only which is desired
        socket.emit("message", formatMessage(botName,"welcome to Gupshup"));
        //broadcast to all users of that room only
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${username} has joined the chat!`));
        
        //update users and room info in the sidebar
        io.to(user.room).emit("updateRoomUsers", {
            room: user.room,
            users: getUsersOfRoom(user.room)
        });
    
    });

    //when someone disconnects, do the following:
    socket.on("disconnect", () => {
        var userWhoLeft = userLeft(socket.id);
        if(userWhoLeft)
        {
            io.to(userWhoLeft.room).emit("message", formatMessage(botName,`${userWhoLeft.username} has left the chat.`));

            //update users and room info in the sidebar
            io.to(userWhoLeft.room).emit("updateRoomUsers", {
            room: userWhoLeft.room,
            users: getUsersOfRoom(userWhoLeft.room)
        });
        }
    });

    //broadcasting a usual chat message
    socket.on("chatMessage", (msgRecvd) => {
        var sender = getUser(socket.id);
        io.to(sender.room).emit("message", formatMessage(sender.username, msgRecvd));
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

