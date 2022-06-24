import { Command } from "../../interfaces/Command";
import axios from "axios"
import { setCooldown, log, errorMessage } from "../../utils/utils";

export default {
    name: "uptime",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    async execute({ client, channel, userstate }) {
        try {
            setCooldown(client, this, channel, userstate);
            const resp = await axios.get(`https://beta.decapi.me/twitch/uptime/${encodeURIComponent(channel.slice(1))}`);
            if (!resp || !resp.data || !resp.data.length) return;

            if (resp.data.toLowerCase().includes("offline")) return client.say(channel, `/me ${resp.data}`);

            return client.say(channel, `/me ${channel.slice(1)} has been live for ${resp.data}.`);
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;