import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "sonic",
    category: "Clips",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            "/me Let's take the sonic route! https://clips.twitch.tv/ResoluteGracefulPlumageFailFish"
        );
    }
} as Command;
