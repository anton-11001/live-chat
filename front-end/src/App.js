import React, { useRef, useState } from "react";

const SERVER_URL = "ws://localhost:5000";

const EVENTS = {
  CONNECTION: "connection",
  MESSAGE: "message",
};

const generateID = () => Math.random().toString(36).substring(2, 10);

function App() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const connect = (event) => {
    event.preventDefault();

    socket.current = new WebSocket(SERVER_URL);

    const handleOpenSocketConnection = () => {
      setConnected(true);

      const message = {
        event: EVENTS.CONNECTION,
        username,
        id: generateID(),
      };

      socket.current.send(JSON.stringify(message));
    };

    const handleSocketConnectionMessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onopen = handleOpenSocketConnection;

    socket.current.onmessage = handleSocketConnectionMessage;

    socket.current.onclose = () => {
      console.log("Socket is closed");
    };

    socket.current.onerror = () => {
      console.log("Socket error");
    };
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    const message = {
      username,
      message: value,
      id: generateID(),
      event: EVENTS.MESSAGE,
    };

    socket.current.send(JSON.stringify(message));

    setValue("");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  if (!connected) {
    return (
      <form onSubmit={connect}>
        <input
          value={username}
          onChange={handleUsernameChange}
          type="text"
          placeholder="Enter your name"
        />
        <button type="submit">Join</button>
      </form>
    );
  }

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          value={value}
          onChange={handleValueChange}
          type="text"
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>

      {messages.map((m) => (
        <div key={m.id}>
          {m.event === EVENTS.CONNECTION ? (
            <div>User {m.username} has connected</div>
          ) : (
            <div>
              {m.username}: {m.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
