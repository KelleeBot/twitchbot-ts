import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
    name: "tw",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            "/me This game may contain material that may be triggering to some people; including: suicide, death and mental health disorders. If any of these topics are triggering for you, please feel free to leave the stream. We love and appreciate you. ʕっ•ᴥ•ʔっ"
        );
    }
} as Command;
