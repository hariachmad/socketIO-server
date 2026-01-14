import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("register", (userId) => {
    socket.userId = userId;
    console.log(`📍 User registered with ID: ${userId}`);
  });

  socket.on("recordCommand", (msg) => {
    console.log("📡 Record command:", msg, " from :", socket.userId);
    io.emit("recordCommand", msg);
  });

  socket.on("navigateCommand", (msg) => {
    console.log("📡 Navigate command:", msg, " from :", socket.userId);
    io.emit("navigateCommand", msg);
  });

  socket.on("recordingState", (msg) => {
    console.log("📡 Navigate command:", msg, " from :", socket.userId);
    io.emit("recordingState", msg);
  });

  socket.on("lightState", (msg) => {
    console.log("📡 Light Controller:", msg, " from :", socket.userId);
    io.emit("lightState", msg);
  });

  socket.on("functionalities_command", (msg) => {
    console.log("Functionalities Command: ",msg, " from :", socket.id);
  });
});

httpServer.listen(3000, () =>
  console.log("🚀 Socket.IO server aktif di port 3000")
);
