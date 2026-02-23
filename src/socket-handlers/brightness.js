export default function brightnessHandlers(socket, io) {
    //BRIGHTNESS
    socket.on("INCREASE_SCREEN_BRIGHTNESS", (msg) => {
        console.log("INCREASE_SCREEN_BRIGHTNESS : ", msg);
        io.timeout(1000).emit("INCREASE_SCREEN_BRIGHTNESS", msg, (err, res) => {
            if (err) {
                console.log("INCREASE_SCREEN_BRIGHTNESS failed:", err);
            } else {
                console.log("INCREASE_SCREEN_BRIGHTNESS success:", res);
                io.to("frontend").emit("INCREASE_SCREEN_BRIGHTNESS", msg)
            }
        })
    });

    socket.on("DECREASE_SCREEN_BRIGHTNESS", (msg) => {
        console.log("DECREASE_SCREEN_BRIGHTNESS : ", msg);
        io.timeout(1000).emit("DECREASE_SCREEN_BRIGHTNESS", msg, (err, res) => {
            if (err) {
                console.log("DECREASE_SCREEN_BRIGHTNESS failed:", err);
            } else {
                console.log("DECREASE_SCREEN_BRIGHTNESS success:", res);
                io.to("frontend").emit("DECREASE_SCREEN_BRIGHTNESS", msg)
            }
        })
    });

    socket.on("SCREEN_BRIGHTNESS_SET", (msg) => {
        console.log("SCREEN_BRIGHTNESS_SET:", msg);
        io.emit("SCREEN_BRIGHTNESS_SET", msg);
    });

    socket.on("SCREEN_BRIGHTNESS_LEVEL_GET_ACK", (msg) => {
        console.log("SCREEN_BRIGHTNESS_LEVEL_GET_ACK:", msg);
        io.to("frontend").emit("SCREEN_BRIGHTNESS_GET", msg);
    })

    socket.on("SCREEN_BRIGHTNESS_GET", (msg, ack) => {
        console.log("BRIGHTNESS_GET:", msg, "from:", socket.userId);
        io.emit("SCREEN_BRIGHTNESS_LEVEL_GET", msg);
    });
}