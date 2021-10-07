import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "kofi",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(channel, `/me Kéllee's Ko-Fi: https://ko-fi.com/kelleeluna`);
    }
} as Command;
