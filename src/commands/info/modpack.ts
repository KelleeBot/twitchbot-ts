import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "modpack",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            `/me You can find Meteo's Pack here on curseforge: https://www.curseforge.com/minecraft/modpacks/meteos-pack`
        );
    }
} as Command;
