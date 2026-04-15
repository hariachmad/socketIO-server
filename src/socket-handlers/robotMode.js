export default function robotModeHandlers(socket, io) {
    //Costum ACK

    //ROBOT_MODE
    socket.on("LISTENING", (msg) => {
        console.log("LISTENING:", msg, "from:", socket.userId);
        io.emit("LISTENING", msg);
    })

    socket.on("TALKING", (msg, ack) => {
        console.log("TALKING:", msg, "from:", socket.userId);
        io.emit("TALKING", msg);
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

    socket.on("WAKE_UP", (msg, ack) => {
        try {
            console.log("WAKE_UP:", msg, "from:", socket.userId);
            const parsed =
                typeof msg === "string" ? JSON.parse(msg) : msg;

            const result = parsed.data;

            io.emit("WAKE_UP", result);
        } catch (err) {
            console.log(err);
            socket.emit("error", {
                event: "WAKE_UP",
                message: "Invalid JSON format",
                raw: msg,
            });
            return;
        }
    });

    //SLEEP
    socket.on("SLEEP", (msg, ack) => {
        try {
            console.log("SLEEP:", msg, "from:", socket.userId);
            const parsed =
                typeof msg === "string" ? JSON.parse(msg) : msg;

            const result = parsed.data;

            io.emit("SLEEP", result);
        } catch (err) {
            console.log(err);
            socket.emit("error", {
                event: "SLEEP",
                message: "Invalid JSON format",
                raw: msg,
            });
            return;
        }
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