export default function volumeHandlers(socket, io) {
    //VOLUME
    socket.on("INCREASE_VOLUME", (msg) => {
        console.log("INCREASE_VOLUME : ", msg);
        io.timeout(1000).emit("INCREASE_VOLUME", msg, (err, res) => {
            if (err) {
                console.log("INCREASE_VOLUME failed:", err);
            } else {
                console.log("INCREASE_VOLUME success:", res);
                io.to("frontend").emit("INCREASE_VOLUME", msg)
            }
        })
    });

    socket.on("DECREASE_VOLUME", (msg) => {
        console.log("DECREASE_VOLUME : ", msg);
        io.timeout(1000).emit("DECREASE_VOLUME", msg, (err, res) => {
            if (err) {
                console.log("DECREASE_VOLUME failed:", err);
            } else {
                console.log("DECREASE_VOLUME success:", res);
                io.to("frontend").emit("DECREASE_VOLUME", msg)
            }
        })
    });

    socket.on("VOLUME_SET", (msg) => {
        console.log("VOLUME_SET:", msg, "from:", socket.userId);
        io.emit("VOLUME_SET", msg);
    });

    socket.on("VOLUME_GET_ACK", (msg) => {
        console.log("VOLUME_GET_ACK:", msg, "from:", socket.userId);
        io.to("frontend").emit("VOLUME_GET", msg);
    })

    socket.on("VOLUME_GET", (msg) => {
        console.log("VOLUME_GET", msg, "from:", socket.userId);
        io.emit("SOUND_VOLUME_GET", msg);
    });
    
}