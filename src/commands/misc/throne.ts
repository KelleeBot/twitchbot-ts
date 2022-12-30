import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "throne",
    category: "Misc",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            `/me Buy me stuff from my Throne, pwease 🥺 https://throne.me/kellee/wishlist`
        );
    }
} as Command;
