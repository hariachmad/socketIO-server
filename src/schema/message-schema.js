import { z } from "zod";

// Optional (kalau masih dipakai)
export const scanWifiSchema = z.object({});

// 1. wifi_scan_started
export const wifi_scan_started = z.object({
    timestamp: z.number(),
});

// 2. scan_wifi_stream
export const scan_wifi_stream = z.object({
    timestamp: z.number(),
});

// 3. connect_wifi
export const connect_wifi = z.object({
    ssid: z.string(),
    password: z.string(),
});

// 4. get_wifi_status
export const get_wifi_status = z.object({});

// 5. disconnect_wifi
export const disconnect_wifi = z.object({});

// 6. wifi_status
export const wifi_status = z.object({
    status: z.string().optional(),
});

// 7. wifi_connecting
export const wifi_connecting = z.object({
    ssid: z.string().optional(),
});

// 8. wifi_scan_completed
export const wifi_scan_completed = z.object({
    timestamp: z.number(),
});

// 9. wifi_network_found
export const wifi_network_found = z.object({
    ssid: z.string(),
    rssi: z.number().optional(),
});

// 10. wifi_connection_progress
export const wifi_connection_progress = z.object({
    progress: z.number().optional(),
});

// 11. wifi_connected
export const wifi_connected = z.object({
    ssid: z.string().optional(),
});

// 12. wifi_connection_failed
export const wifi_connection_failed = z.object({
    reason: z.string().optional(),
});

// 13. wifi_disconnected
export const wifi_disconnected = z.object({
    reason: z.string().optional(),
});

// 14. wifi_error
export const wifi_error = z.object({
    message: z.string().optional(),
});

// 15. tz_info
export const tz_info = z.object({
    tz: z.string().optional(),
});

// 16. tz_ret
export const tz_ret = z.object({
    tz: z.string().optional(),
});