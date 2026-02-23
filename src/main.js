import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { NO_ACK_EVENTS } from "./constants/no-ack-events.js";
import { ACK_EVENTS } from "./constants/ack-events.js";
import registerHandlers from "./socket-handlers/index.js";

const app = express();
const httpServer = createServer(app);

app.get("/health", (req, res) => { res.status(200).json({ status: "ready" }); });

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {

  const { userId } = socket.handshake.auth;

  console.log("Client connected:", userId);

  socket.join(userId);

  NO_ACK_EVENTS.forEach((eventName) => {
    socket.on(eventName, (msg) => {
      console.log(`${eventName} command:`, msg, "from:", socket.userId);
      io.emit(eventName, msg);
    });
  });

  ACK_EVENTS.forEach((eventName) => {
    socket.on(eventName, (msg, ack) => {
      console.log(`${eventName} command:`, msg, "from:", socket.userId);
      io.emit(eventName, msg);
    });
  });

  registerHandlers(socket, io);
})

httpServer.listen(3000, () =>
  console.log(" Socket.IO server aktif di port 3000")
);
