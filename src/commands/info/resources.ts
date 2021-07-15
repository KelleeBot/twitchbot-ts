import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "resources",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            `/me Here is a list of resources to help BIPOC and LGBTQ+ communities. If you have more resources, please DM Kéllee. https://kellee.carrd.co/`
        );
    }
} as Command;
