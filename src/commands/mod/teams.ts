import { Command } from "../../interfaces/Command";
import { randomRange } from "../../utils/utils";
import { countdown, countdownTeams, startCountdown, started } from "../../utils/countdown";

const tetrisTeams = ["blue", "red", "yellow", "green"];

export default {
    name: "teams",
    category: "Mod",
    isModOnly: true,
    execute({ client, channel, args }) {
        if (started(channel)) {
            return client.say(channel, "/me I can only do one countdown at a time kellee1Glare");
        }

        const index = randomRange(0, tetrisTeams.length - 1);
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

        startCountdown(channel);
        return countdownTeams(client, channel, 20, team.charAt(0));
    }
} as Command;
