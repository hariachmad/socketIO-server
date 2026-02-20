import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { NO_ACK_EVENTS } from "./constants/no-ack-events.js";
import { ACK_EVENTS } from "./constants/ack-events.js";

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

  //Costum ACK

  //ROBOT_MODE
  socket.on("LISTENING", (msg, ack) => {
    console.log("LISTENING:", msg, "from:", socket.userId);
    io.to("raspberry").emit("LISTENING", msg);
    io.to("frontend").emit("LISTENING", msg);
  })

  socket.on("TALKING", (msg, ack) => {
    console.log("TALKING:", msg, "from:", socket.userId);
    io.to("raspberry").emit("TALKING", msg);
    io.to("frontend").emit("TALKING", msg);
  })

  //VOLUME
  socket.on("INCREASE_VOLUME", (msg) => {
    console.log("INCREASE_VOLUME : ", msg);
    io.emit("INCREASE_VOLUME", msg)
  });

  socket.on("DECREASE_VOLUME", (msg) => {
    console.log("DECREASE_VOLUME : ", msg);
    io.emit("DECREASE_VOLUME", msg)
  });

  socket.on("VOLUME_SET", (msg, ack) => {
    console.log("SOUND_VOLUME_SET:", msg, "from:", socket.userId);
    io.emit("SOUND_VOLUME_SET", msg);
  });

  socket.on("VOLUME_GET_ACK", (msg) => {
    console.log("VOLUME_GET_ACK:", msg, "from:", socket.userId);
    io.emit("VOLUME_GET", msg);
  })

  socket.on("VOLUME_GET", (msg, ack) => {
    console.log("VOLUME_GET", msg, "from:", socket.userId);
    io.emit("SOUND_VOLUME_GET", msg);
  });

  //BRIGHTNESS
  socket.on("INCREASE_BRIGHTNESS", (msg) => {
    console.log("INCREASE_BRIGHTNESS : ", msg);
    io.emit("INCREASE_BRIGHTNESS", msg)
  });

  socket.on("DECREASE_BRIGHTNESS", (msg) => {
    console.log("DECREASE_BRIGHTNESS : ", msg);
    io.emit("DECREASE_BRIGHTNESS", msg)
  });

  socket.on("BRIGHTNESS_SET", (msg) => {
    console.log("BRIGHTNESS_SET:", msg, "from:", socket.userId);
    io.emit("SCREEN_BRIGHTNESS_SET", msg);
  });

  socket.on("BRIGHTNESS_GET_ACK", (msg) => {
    console.log("BRIGHTNESS_GET_ACK:", msg, "from:", socket.userId);
    io.emit("BRIGHTNESS_GET", msg);
  })

  socket.on("BRIGHTNESS_GET", (msg, ack) => {
    console.log("BRIGHTNESS_GET:", msg, "from:", socket.userId);
    io.emit("SCREEN_BRIGHTNESS_GET", msg);
  });

  //WAKE-UP
  socket.on("PING_DEVICE_UP", (msg, ack) => {
    console.log("WAKE_UP:", msg, "from:", socket.userId);
    io.to("raspberry").emit("PING_DEVICE_UP", msg);
  });

  socket.on("PING_DEVICE_UP_FRONTEND", (msg, ack) => {
    console.log("PING_DEVICE_UP_FRONTEND:", msg, "from:", socket.userId);
    io.to("frontend").emit("BRIGHTNESS_SET", msg);
    io.to("frontend-ui").emit("PING_DEVICE_UP", msg);
  });

  //SLEEP
  socket.on("SLEEP", (msg, ack) => {
    console.log("SLEEP:", msg, "from:", socket.userId);
    io.to("raspberry").emit("SLEEP", msg);
  });

  socket.on("SLEEP_FRONTEND", (msg, ack) => {
    console.log("SLEEP_FRONTEND:", msg, "from:", socket.userId);
    io.to("frontend").emit("BRIGHTNESS_SET", msg);
    io.to("frontend-ui").emit("SLEEP", msg);
  });

  socket.on("DEVICE_READY", (msg, ack) => {
    console.log("DEVICE_READY command:", msg, "from:", socket.userId);
    io.emit("DEVICE_READY", msg)
  });

  socket.on("i_am_ok", (msg) => {
    console.log("i_am_ok:", socket.userId);
    io.to("frontend-ui").emit("i_am_ok", msg);
  });

  socket.on("SPEECH_MODULE_READY", (msg) => {
    console.log("SPEECH_MODULE_READY", socket.userId);
    io.to("frontend-ui").emit("SPEECH_MODULE_READY", msg);
  });

  socket.on("SPEECH_MODULE_PROCESS", (msg) => {
    console.log("SPEECH_MODULE_PROCESS", socket.userId);
    io.to("frontend-ui").emit("SPEECH_MODULE_PROCESS", msg);
  });
})

httpServer.listen(3000, () =>
  console.log(" Socket.IO server aktif di port 3000")
);
