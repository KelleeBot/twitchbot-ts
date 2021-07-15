"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const countdown_1 = require("../../utils/countdown");
const tetrisTeams = ["blue", "red", "yellow", "green"];
exports.default = {
    name: "teams",
    category: "Mod",
    isModOnly: true,
    execute({ client, channel, args }) {
        if (countdown_1.started(channel)) {
            return client.say(channel, "/me I can only do one countdown at a time kellee1Glare");
        }
        const index = utils_1.randomRange(0, tetrisTeams.length - 1);
        const team = tetrisTeams[index];
        let botColor = "";
        switch (team) {
            case "blue":
                botColor = "DodgerBlue";
                break;
            case "red":
                botColor = "FireBrick";
                break;
            case "yellow":
                botColor = "GoldenRod";
                break;
            case "green":
                botColor = "SpringGreen";
                break;
        }
        countdown_1.startCountdown(channel);
        return countdown_1.countdownTeams(client, channel, 20, team.charAt(0));
    }
};
