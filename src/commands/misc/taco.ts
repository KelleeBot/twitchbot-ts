import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "taco",
    aliases: ["🌮", "collab"],
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Today is Taco Tuesday!!! With guest @7Squish! Please go give them a follow over at https://www.twitch.tv/7squish!");
    }
} as Command;
