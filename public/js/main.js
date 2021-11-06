const chatFormElem = document.getElementById("chat-form");
const chatMessagesElem = document.querySelector(".chat-messages");
const roomNameElem = document.getElementById("room-name");
const usersListElem = document.getElementById("users"); // this is a <ul> of users
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix : true
});
const socket = new io();

//announcement that a new user is joining a room
//will catch this on the server side in server.js
socket.emit("joinRoom", {username, room});

// socket.emit emits the message, which the below function catches
socket.on("message", (message) => {
    // console.log(message);
    displayMessage(message);
    chatMessagesElem.scrollTop = chatMessagesElem.scrollHeight;

});

socket.on("updateRoomUsers", ({room, users}) => {
    displayRoomName(room); //adding room name to chat page's DOM
    displayRoomUsers(users); //
});

//what happens on sending a message
chatFormElem.addEventListener("submit", (e) => {
    e.preventDefault();
    const msgContent = e.target.elements.msg.value; // harvesting the message text
    e.target.elements.msg.value = ""; //clearing out the input message field
    socket.emit("chatMessage", msgContent); //send the msgContent to server
});

//once the client receives a `message` how to display the message in DOM
function displayMessage(msgStruct)
{
    div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class = "meta">${msgStruct.sender} <span>${msgStruct.time}</span></p>
    <p class = "text">${msgStruct.text}</p>`
    document.querySelector(".chat-messages").appendChild(div)
}

function displayRoomName(room)
{
    roomNameElem.innerText = room;
}

//add users to the chat page's DOM (in the left panel)
function displayRoomUsers(users)
{
    usersListElem.innerHTML = `${users.map(x => `<li>${x.username}</li>`).join("")}`;
}
