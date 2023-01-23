# Live Chat

A small real-time chat application built with React and WebSockets.

The project has two parts:

- `front-end/` - React client application.
- `back-end/` - WebSocket server using the `ws` package.

## Requirements

- Node.js
- npm

## Installation

Install dependencies for the backend:

```bash
cd back-end
npm install
```

Install dependencies for the frontend:

```bash
cd ../front-end
npm install
```

## Running the App

Start the WebSocket server:

```bash
cd back-end
npm start
```

The server runs on:

```text
ws://localhost:5000
```

Start the React app in a second terminal:

```bash
cd front-end
npm start
```

The React development server opens:

```text
http://localhost:3000
```

## How It Works

1. The user enters a username and clicks `Join`.
2. The frontend opens a WebSocket connection to `ws://localhost:5000`.
3. The client sends a `connection` event to the server.
4. The server broadcasts chat events to every connected client.
5. When a user sends a message, the frontend sends a `message` event and displays incoming messages.

## Message Format

Connection event:

```json
{
  "event": "connection",
  "username": "Alex",
  "id": "abc123"
}
```

Chat message event:

```json
{
  "event": "message",
  "username": "Alex",
  "message": "Hello!",
  "id": "def456"
}
```

## Project Structure

```text
live-chat/
  back-end/
    package.json
    server.js
  front-end/
    package.json
    public/
      index.html
    src/
      App.js
      index.js
  README.md
```
