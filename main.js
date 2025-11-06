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
    console.log("📡 Record command:", msg," from :", socket.userId);
    io.emit("recordCommand", msg);
  });
});

httpServer.listen(3000, () =>
  console.log("🚀 Socket.IO server aktif di port 3000")
);
