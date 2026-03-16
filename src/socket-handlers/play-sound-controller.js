export default function play_sound_controller(socket,io){
    socket.on("ACTIVITY_REMINDER_ACK", (msg) => {
        console.log("ACTIVITY_REMINDER_ACK :", msg);
        io.emit("ACTIVITY_REMINDER_ACK", msg);
    });
}