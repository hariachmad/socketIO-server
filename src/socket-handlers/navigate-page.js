const events = [
    "SHOW_MEDICINE_SCHEDULE_WEEK",
    "SHOW_MEDICINE_SCHEDULE_MONTH",
    "SHOW_MEDICINE_SCHEDULE_SPECIFIC_DAY",
    "SHOW_APPOINTMENT_SCHEDULE_WEEK",
    "SHOW_APPOINTMENT_SCHEDULE_MONTH",
    "SHOW_APPOINTMENT_SCHEDULE_SPECIFIC_DAY",
    "SHOW_HEALTH_ACTIVITY_WEEK",
    "SHOW_HEALTH_ACTIVITY_MONTH",
    "SHOW_HEALTH_ACTIVITY_SPECIFIC_DAY",
    "SHOW_SOCIAL_ACTIVITY_WEEK",
    "SHOW_SOCIAL_ACTIVITY_MONTH",
    "SHOW_SOCIAL_ACTIVITY_SPECIFIC_DAY",
    "SHOW_VISITS_WEEK",
    "SHOW_VISITS_MONTH",
    "SHOW_VISITS_SPECIFIC_DAY",
];

export default function navigatePageHandlers(socket, io) {
    events.forEach((eventName) => {
        socket.on(eventName, (msg) => {
            console.log(`${eventName} command:`, msg, "from:", socket.userId);
            io.emit(eventName, msg);
        });
    })
}