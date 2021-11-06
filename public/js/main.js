const chatFormElem = document.getElementById("chat-form");
const socket = new io();

// socket.emit emits the message, which the below function catches
socket.on("message", (message) => {
    displayMessage(message);
});

//what happens on sending a message
chatFormElem.addEventListener("submit", (e) => {
    e.preventDefault();
    const msgContent = e.target.elements.msg.value; // harvesting the message text
    socket.emit("chatMessage", msgContent); //send the msgContent to server
});

//once the client receives a `message` how to display the message in DOM
function displayMessage(msgContent)
{
    div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class = "meta">Sender <span>hh:mm pm</span></p>
    <p class = "text">${msgContent}</p>`
    document.querySelector(".chat-messages").appendChild(div)
}