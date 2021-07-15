"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.started = exports.startCountdown = exports.countdownTeams = exports.countdown = void 0;
let cdStarted = {};
const countdown = (client, channel, seconds) => {
    const interval = setInterval(() => {
        if (seconds == 0) {
            client.say(channel, "/me Go!");
            client.say(channel, "/color HotPink");
            clearTimeout(interval);
            cdStarted[channel] = false;
        }
        if (seconds % 10 == 0 && seconds != 0) {
            client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
        }
        if (seconds == 6) {
            client.say(channel, "/me Ready kellee1Glare");
        }
        if (seconds < 6 && seconds > 0) {
            client.say(channel, `/me ${seconds}`);
        }
        seconds--;
    }, 1000);
};
exports.countdown = countdown;
const countdownTeams = (client, channel, seconds, color) => {
    switch (color) {
        case "r":
            client.color("FireBrick");
            client.say(channel, "/me Team Battle: Red Team");
            break;
        case "y":
            client.color("GoldenRod");
            client.say(channel, "/me Team Battle: Yellow Team");
            break;
        case "b":
            client.color("DodgerBlue");
            client.say(channel, "/me Team Battle: Blue Team");
            break;
        case "g":
            client.color("SpringGreen");
            client.say(channel, "/me Team Battle: Green Team");
            break;
        default:
            return client.say(channel, "/me Invalid team color.");
    }
    if (+seconds % 10 != 0) {
        client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
    }
    return countdown(client, channel, seconds);
};
exports.countdownTeams = countdownTeams;
const started = (channel) => {
    return cdStarted[channel];
};
exports.started = started;
const startCountdown = (channel) => {
    cdStarted[channel] = true;
};
exports.startCountdown = startCountdown;
