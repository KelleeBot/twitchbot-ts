"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countdown_1 = require("../../utils/countdown");
const teamColors = ["r", "y", "b", "g"];
exports.default = {
    name: "cd",
    aliases: ["countdown"],
    category: "Mod",
    isModOnly: true,
    arguments: [
        {
            type: "NUMBER"
        }
    ],
    execute({ client, channel, args }) {
        if (countdown_1.started(channel)) {
            return client.say(channel, "/me I can only do one countdown at a time kellee1Glare");
        }
        if (!args[0]) {
            countdown_1.startCountdown(channel);
            return countdown_1.countdown(client, channel, 6);
        }
        const splitString = args[0].split(/(\d+)/); // Split string by number
        const seconds = splitString[1];
        const color = splitString[2] ? splitString[2].toLowerCase() : "";
        if (isNaN(+seconds) || !Number.isInteger(+seconds))
            return;
        if (+seconds > 99) {
            return client.say(channel, "/me Countdown can't be longer than 99 seconds.");
        }
        if (!color) {
            countdown_1.startCountdown(channel);
            if (+seconds % 10 != 0) {
                client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
            }
            return countdown_1.countdown(client, channel, +seconds);
        }
        if (!teamColors.includes(color))
            return client.say(channel, "/me Invalid team color.");
        countdown_1.startCountdown(channel);
        return countdown_1.countdownTeams(client, channel, +seconds, color);
    }
};
