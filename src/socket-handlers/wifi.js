import { wifi_scan_started } from "../schema/message-schema.js";

export default function wifiHandlers(socket, io) {
    //WIFI
    socket.on("wifi_scan_started", (msg) => {
        try {
            console.log("wifi_scan_started:", msg, "from:", socket.userId);
            const parsed =
                typeof msg === "string" ? JSON.parse(msg) : msg;

            const validated = wifi_scan_started.safeParse(parsed);

            if (!validated.success) {
                socket.emit("error", {
                    event: "wifi_scan_started",
                    message: "Validation failed",
                });
                return;
            }

            const result = parsed.data;

            io.emit("wifi_scan_started", result);
        } catch (err) {
            console.log(err);
            socket.emit("error", {
                event: "wifi_scan_started",
                message: "Invalid JSON format",
                raw: msg,
            });
            return;
        }
    });

    socket.on("connect_wifi", (msg) => {
        console.log("connect_wifi:", msg, "from:", socket.userId);
        io.emit("connect_wifi", msg);
    })
    socket.on("get_wifi_status", (msg) => {
        console.log("get_wifi_status:", msg, "from:", socket.userId);
        io.emit("get_wifi_status", msg);
    })
    socket.on("disconnect_wifi", (msg) => {
        console.log("disconnect_wifi:", msg, "from:", socket.userId);
        io.emit("disconnect_wifi", msg);
    })
    socket.on("scan_wifi_stream", (msg) => {
        console.log("wifi_scan_started:", msg, "from:", socket.userId);
        io.emit("wifi_scan_started", msg);
    })

    socket.on("wifi_status", (msg) => {
        console.log("wifi_status:", msg, "from:", socket.userId);
        io.emit("wifi_status", msg);
    })
    socket.on("wifi_connecting", (msg) => {
        console.log("wifi_connecting:", msg, "from:", socket.userId);
        io.emit("wifi_connecting", msg);
    })
    socket.on("wifi_scan_completed", (msg) => {
        console.log("wifi_scan_completed:", msg, "from:", socket.userId);
        io.emit("wifi_scan_completed", msg);
    })
    socket.on("wifi_network_found", (msg) => {
        console.log("wifi_network_found:", msg, "from:", socket.userId);
        io.emit("wifi_network_found", msg);
    })
    socket.on("wifi_connection_progress", (msg) => {
        console.log("wifi_connection_progress:", msg, "from:", socket.userId);
        io.emit("wifi_connection_progress", msg);
    })
    socket.on("wifi_connected", (msg) => {
        console.log("wifi_connected:", msg, "from:", socket.userId);
        io.emit("wifi_connected", msg);
    })
    socket.on("wifi_connection_failed", (msg) => {
        console.log("wifi_connection_failed:", msg, "from:", socket.userId);
        io.emit("wifi_connection_failed", msg);
    })
    socket.on("wifi_disconnected", (msg) => {
        console.log("wifi_disconnected:", msg, "from:", socket.userId);
        io.emit("wifi_disconnected", msg);
    })
    socket.on("wifi_error", (msg) => {
        console.log("wifi_error:", msg, "from:", socket.userId);
        io.emit("wifi_error", msg);
    })
    socket.on("tz_info", (msg) => {
        console.log("tz_info:", msg, "from:", socket.userId);
        io.emit("tz_info", msg);
    })
    socket.on("tz_ret", (msg) => {
        console.log("tz_ret:", msg, "from:", socket.userId);
        io.emit("tz_ret", msg);
    })
}
