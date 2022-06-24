import { Command } from "../../interfaces/Command";
import axios from "axios";
import { errorMessage, log, replaceChars, setCooldown } from "../../utils/utils";

export default {
    name: "followage",
    category: "Info",
    cooldown: 15,
    async execute({ client, channel, userstate }) {
        try {
            setCooldown(client, this, channel, userstate);

            const resp = await axios.get(`https://beta.decapi.me/twitch/followage/${process.env.CHANNEL_NAME}/${userstate.username}?precision=7`);
            if (!resp || !resp.data || !resp.data.length) return;

            if (replaceChars(resp.data) == "a user cannot follow themself") return client.say(channel, `/me ${resp.data}`);

            return client.say(
                channel,
                `/me ${userstate["display-name"]} has been following ${process.env.CHANNEL_NAME} for ${resp.data}.`
            );
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;
