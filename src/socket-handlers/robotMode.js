export default function robotModeHandlers(socket, io) {
    //Costum ACK

    //ROBOT_MODE
    socket.on("LISTENING", (msg) => {
        console.log("LISTENING:", msg, "from:", socket.userId);
        io.to("raspberry").emit("LISTENING", msg);
        io.to("frontend").emit("LISTENING", msg);
    })

    socket.on("TALKING", (msg, ack) => {
        console.log("TALKING:", msg, "from:", socket.userId);
        io.to("raspberry").emit("TALKING", msg);
        io.to("frontend").emit("TALKING", msg);
    })

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

    socket.on("SPEECH_MODULE_READY", (msg) => {
        console.log("SPEECH_MODULE_READY", socket.userId);
        io.to("frontend-ui").emit("SPEECH_MODULE_READY", msg);
    });

    socket.on("SPEECH_MODULE_PROCESS", (msg) => {
        console.log("SPEECH_MODULE_PROCESS", socket.userId);
        io.to("frontend-ui").emit("SPEECH_MODULE_PROCESS", msg);
    });
}