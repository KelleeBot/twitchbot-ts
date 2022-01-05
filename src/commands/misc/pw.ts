import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "pw",
    aliases: ["password"],
    category: "Misc",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Tetris Password: 108523");
    }
} as Command;
