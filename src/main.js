import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { NO_ACK_EVENTS } from "./constants/no-ack-events.js";
import { ACK_EVENTS } from "./constants/ack-events.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("recordCommand", (msg) => {
    console.log("Record command:", msg, " from :", socket.userId);
    io.emit("recordCommand", msg);
  });

  NO_ACK_EVENTS.forEach((eventName) => {
    socket.on(eventName, (msg) => {
      console.log(`${eventName} command:`, msg, "from:", socket.userId);
      io.emit(eventName, msg);
    });
  });

  ACK_EVENTS.forEach((eventName) => {
    socket.on(eventName, (msg, ack) => {
      console.log(`${eventName} command:`, msg, "from:", socket.userId);
      io.emit(eventName, msg, (ackFromClient) => {
        console.log(`${eventName} ack:`, ackFromClient, "from:", socket.userId);
        ack(ackFromClient);
      });
    });
  });

  //Costum ACK

  socket.on("SCREEN_BRIGHTNESS_SET", (msg, ack) => {
    console.log("SCREEN_BRIGHTNESS_SET command:", msg, "from:", socket.userId);
    io.emit("SCREEN_BRIGHTNESS_SET", msg.level, (ackFromClient) => {
      const result = { level: ackFromClient.level }
      ack({ result });
    });
  });

  socket.on("SCREEN_BRIGHTNESS_GET", (msg, ack) => {
    console.log("SCREEN_BRIGHTNESS_GET command:", msg, "from:", socket.userId);
    io.emit("SCREEN_BRIGHTNESS_GET", msg, (ackFromClient) => {
      const result = { level: ackFromClient.level }
      ack({ result });
    });
  });

  socket.on("VOLUME_SET", (msg, ack) => {
    console.log("VOLUME_SET command:", msg, "from:", socket.userId);
    io.emit("VOLUME_SET", msg.volume, (ackFromClient) => {
      const result = { volume: ackFromClient.volume }
      ack({ result });
    });

  });

  socket.on("VOLUME_GET", (msg, ack) => {
    console.log("VOLUME_GET command:", msg, "from:", socket.userId);
    io.emit("VOLUME_GET", msg, (ackFromClient) => {
      const result = { volume: ackFromClient.volume }
      ack({ result });      
    })
  });

  socket.on("DEVICE_READY", (msg, ack) => {
    console.log("DEVICE_READY command:", msg, "from:", socket.userId);
    io.emit("DEVICE_READY", msg, (ackFromClient) => {
      const result = { ack : true }
      ack({ result });      
    })
  });
})

httpServer.listen(3000, () =>
  console.log("🚀 Socket.IO server aktif di port 3000")
);
