import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "fc",
    aliases: ["friendcode", "code"],
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Kellee's Switch friend code: SW-1603-0974-7504");
    }
} as Command;
