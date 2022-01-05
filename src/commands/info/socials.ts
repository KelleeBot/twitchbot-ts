import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "socials",
    aliases: ["social"],
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            "/me You can find me on social media by clicking on this Linktree link! https://www.linktr.ee/kellee_vt"
        );
    }
} as Command;
