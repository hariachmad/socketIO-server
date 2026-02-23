export default function incidentHandlers(socket, io) {
    //FALL & HELP

    socket.on("INCIDENT_FALL_DOWN_DETECTED", (msg) => {
        console.log("INCIDENT_FALL_DOWN_DETECTED:", msg);
        io.to("frontend").emit("INCIDENT_FALL_DOWN_DETECTED", msg);
    });

    socket.on("INCIDENT_HELP_EVENT_DETECTED", (msg) => {
        console.log("INCIDENT_HELP_EVENT_DETECTED:", msg);
        io.to("frontend").emit("INCIDENT_HELP_EVENT_DETECTED", msg);
    });

    socket.on("INCIDENT_HELP_EVENT_DETECTED_FRONTEND", (msg) => {
        console.log("INCIDENT_HELP_EVENT_DETECTED:", msg);
        io.emit("INCIDENT_HELP_EVENT_DETECTED_FRONTEND", msg);
    });

    socket.on("INCIDENT_NOT_OK_EVENT_DETECTED", (msg) => {
        console.log("INCIDENT_NOT_OK_EVENT_DETECTED:", msg);
        io.to("frontend").emit("INCIDENT_NOT_OK_EVENT_DETECTED", msg);
    });

    socket.on("INCIDENT_NOT_OK_EVENT_DETECTED_FRONTEND", (msg) => {
        console.log("INCIDENT_NOT_OK_EVENT_DETECTED_FRONTEND:", msg);
        io.emit("INCIDENT_NOT_OK_EVENT_DETECTED_FRONTEND", msg);
    });

    socket.on("INCIDENT_OK_EVENT_DETECTED", (msg) => {
        console.log("INCIDENT_OK_EVENT_DETECTED:", msg);
        io.to("frontend").emit("INCIDENT_OK_EVENT_DETECTED", msg);
    });

    socket.on("INCIDENT_OK_EVENT_DETECTED_FRONTEND", (msg) => {
        console.log("INCIDENT_OK_EVENT_DETECTED_FRONTEND:", msg);
        io.emit("INCIDENT_OK_EVENT_DETECTED_FRONTEND", msg);
    });

    socket.on("INCIDENT_FALL_DOWN_NO_RESPONSE", (msg) => {
        console.log("INCIDENT_FALL_DOWN_NO_RESPONSE:", msg);
        io.to("frontend").emit("INCIDENT_FALL_DOWN_NO_RESPONSE", msg);
    });
}