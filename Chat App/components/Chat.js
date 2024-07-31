const ws = new WebSocket(`ws://${window.location.host}`);
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  ws.send(message);
  messageInput.value = "";
});

ws.onmessage = (event) => {
  const message = event.data;
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messages.appendChild(messageElement);
};
