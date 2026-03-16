import alarmHandlers from "./alarm.js";
import brightnessHandlers from "./brightness.js";
import deviceSettings from "./device-settings.js";
import incidentHandlers from "./incident.js";
import navigatePageHandlers from "./navigate-page.js";
import play_sound_controller from "./play-sound-controller.js";
import robotModeHandlers from "./robotMode.js";
import security from "./security.js";
import volumeHandlers from "./volume.js";
import wifiHandlers from "./wifi.js";


export default function registerHandlers(socket,io){
    volumeHandlers(socket,io);
    brightnessHandlers(socket,io);
    incidentHandlers(socket,io);
    robotModeHandlers(socket,io);
    navigatePageHandlers(socket,io);
    alarmHandlers(socket,io);
    deviceSettings(socket,io);
    security(socket,io);
    play_sound_controller(socket,io);
    wifiHandlers(socket, io);
}