import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "credits",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            `/me https://kellee.carrd.co/`
        );
    }
} as Command;
