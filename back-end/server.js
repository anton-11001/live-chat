const ws = require("ws");

const PORT = 5000;

const EVENTS = {
  MESSAGE: "message",
  CONNECTION: "connection",
};

const wss = new ws.Server(
  {
    port: PORT,
  },
  () => {
    console.log(`Server started on ${PORT}`);
  },
);

const broadcastMessage = (message) => {
  wss.clients.forEach((client) => client.send(JSON.stringify(message)));
};

const messageHandler = (message) => {
  const parsedMessage = JSON.parse(message.toString());

  switch (parsedMessage.event) {
    case EVENTS.MESSAGE:
      broadcastMessage(parsedMessage);
      break;
    case EVENTS.CONNECTION:
      broadcastMessage(parsedMessage);
      break;
  }
};

const connectionHandler = (ws) => {
  ws.on(EVENTS.MESSAGE, messageHandler);
};

wss.on(EVENTS.CONNECTION, connectionHandler);
