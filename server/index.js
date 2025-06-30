const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("cameraToggle", (isOn) => {
    socket.broadcast.emit("cameraToggle", isOn);
  });

  socket.on("colorToggle", (isOn) => {
    socket.broadcast.emit("colorToggle", isOn);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
