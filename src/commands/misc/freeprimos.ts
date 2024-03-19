import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "freeprimos",
    aliases: ["free"],
    category: "Misc",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me https://www.codashop.com/en-us/genshin-impact");
    }
} as Command;
