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
  const parsedMessage = JSON.parse(message);

  switch (message.event) {
    case EVENTS.MESSAGE:
      broadcastMessage(message);
      break;
    case EVENTS.CONNECTION:
      broadcastMessage(message);
      break;
  }
};

const connectionHandler = (ws) => {
  ws.on(EVENTS.MESSAGE, messageHandler);
};

wss.on(EVENTS.CONNECTION, connectionHandler);
