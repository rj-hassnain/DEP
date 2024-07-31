const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const clients = [];

wss.on("connection", function connection(ws) {
  console.log("WS connection arrived");

  clients.push(ws);

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("message", message.toString());
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });

  ws.send("Welcome to the chat!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
