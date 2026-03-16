export default function incidentHandlers(socket, io) {
    //FALL & HELP

    socket.on("INCIDENT_FALL_DOWN_DETECTED", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("INCIDENT_FALL_DOWN_DETECTED:", msg);
        io.emit("INCIDENT_FALL_DOWN_DETECTED", payload);
    });

    socket.on("INCIDENT_HELP_EVENT_DETECTED", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("INCIDENT_HELP_EVENT_DETECTED:", msg);
        io.to("frontend").emit("INCIDENT_HELP_EVENT_DETECTED", payload);
    });

    socket.on("INCIDENT_OK_EVENT_DETECTED", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("INCIDENT_OK_EVENT_DETECTED:", msg);
        io.emit("INCIDENT_OK_EVENT_DETECTED", payload);
    });

    socket.on("INCIDENT_FALL_DOWN_NO_RESPONSE", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("INCIDENT_FALL_DOWN_NO_RESPONSE:", msg);
        io.emit("INCIDENT_FALL_DOWN_NO_RESPONSE", payload);
    });

    socket.on("INCIDENT_COMPLETED", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("INCIDENT_COMPLETED :", msg);
        io.emit("INCIDENT_COMPLETED", payload);
    });

    socket.on("NOTIFY", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("NOTIFY :", msg);
        io.emit("NOTIFY", payload);
    });

    socket.on("SPEECH_ACTIVE", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("SPEECH_ACTIVE :", msg);
        io.emit("SPEECH_ACTIVE", payload);
    });

    socket.on("SPEECH_INACTIVE", (msg) => {
        const payload = {...msg, datetime : formatDateTime()};
        console.log("SPEECH_INACTIVE :", msg);
        io.emit("SPEECH_INACTIVE", payload);
    });
}