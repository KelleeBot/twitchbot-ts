import { Command } from "../../interfaces/Command";
import axios from "axios";
import { errorMessage, log, replaceChars, setCooldown } from "../../utils/utils";

export default {
    name: "followedon",
    category: "Info",
    cooldown: 15,
    async execute({ client, channel, userstate }) {
        try {
            setCooldown(client, this, channel, userstate);
            const resp = await axios.get(`https://beta.decapi.me/twitch/followed/${process.env.CHANNEL_NAME}/${userstate.username
                }?tz=America/New_York&format=${encodeURIComponent("d/m/Y g:i:s A T")}`);
            if (!resp || !resp.data || !resp.data.length) return;

            if (replaceChars(resp.data) == "a user cannot follow themself") return client.say(channel, `/me ${resp.data}`);

            return client.say(
                channel,
                `/me ${userstate["display-name"]} followed ${process.env.CHANNEL_NAME} on ${resp.data}.`
            );
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;
