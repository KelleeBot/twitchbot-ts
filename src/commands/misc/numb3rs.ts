import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { randomRange, formatNumber, log, setCooldown, errorMessage } from "../../utils/utils";

const numAPI = ["trivia", "math"];

export default {
    name: "numb3rs",
    aliases: ["numbers"],
    category: "Misc",
    cooldown: 15,
    async execute({ client, channel, userstate }) {
        try {
            setCooldown(client, this, channel, userstate);
            const index = randomRange(0, numAPI.length - 1);
            const api = numAPI[index];
            const resp = await fetch(`http://numbersapi.com/random/${encodeURIComponent(api)}`);
            const data = await resp.text();
            const num = data.match(/\d+/g);
            const formattedNum = formatNumber(num);
            return client.say(channel, `/me ${data.replace(num[0], formattedNum)}`);
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;
