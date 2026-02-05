import { io } from "socket.io-client";

let volume = 50;
let brightness = 50;

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  timeout: 5000,
  auth : {
    userId: "raspberry" 
  }
});

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("DEVICE_READY", "DEVICE_READY", (ack) => {
    console.log(ack);
  });
});

//VOLUME
socket.on("VOLUME_SET", (msg, ack) => {
    console.log("VOLUME_SET :", msg, "from:", socket.userId);
    if(msg < 0 || msg > 100){
      return;
    }
    volume = msg;
})

socket.on("VOLUME_GET", (msg, ack) => {
    console.log("VOLUME_GET:", msg, "from:", socket.userId);
    socket.emit("VOLUME_GET_ACK", volume);
})

//BRIGHTNESS
socket.on("BRIGHTNESS_SET", (msg, ack) => {
    console.log("BRIGHTNESS_SET :", msg, "from:", socket.userId);
    if(msg < 0 || msg > 100){
      return;
    }
    brightness = msg;
    socket.emit("BRIGHTNESS_SET_ACK",brightness)
})

socket.on("BRIGHTNESS_GET", (msg, ack) => {
    console.log("BRIGHTNESS_GET:", msg, "from:", socket.userId);
    socket.emit("BRIGHTNESS_GET_ACK", brightness);
})

//SLEEP
socket.on("SLEEP", (msg, ack) => {
    console.log("SLEEP:", msg, "from:", socket.userId);
    socket.emit("SLEEP_FRONTEND", 20);
})

//WAKE-UP
socket.on("PING_DEVICE_UP", (msg, ack) => {
    console.log("PING_DEVICE_UP:", msg, "from:", socket.userId);
    socket.emit("PING_DEVICE_UP_FRONTEND", 70);
})