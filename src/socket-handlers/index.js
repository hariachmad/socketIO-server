import brightnessHandlers from "./brightness.js";
import incidentHandlers from "./incident.js";
import robotModeHandlers from "./robotMode.js";
import volumeHandlers from "./volume.js";

export default function registerHandlers(socket,io){
    volumeHandlers(socket,io);
    brightnessHandlers(socket,io);
    incidentHandlers(socket,io);
    robotModeHandlers(socket,io);
}