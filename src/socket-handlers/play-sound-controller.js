export default function play_sound_controller(socket,io){
    socket.on("SCHEDULE_ACK", (msg) => {
        console.log("SCHEDULE_ACK :", msg);
        io.emit("SCHEDULE_ACK", msg);
    });
}