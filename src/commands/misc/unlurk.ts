import { Command } from "../../interfaces/Command";
import { randomRange, setCooldown } from "../../utils/utils";

const unlurk = [
    "Welcome back from your lurk <username>! Great to see you again!",
    "Welcome back <username>! Hope you enjoyed your lurk. You've missed absolutely nothing.",
    "<username> has exited lurk mode. Welcome back, we've missed you ʕっ•ᴥ•ʔっ"
];

export default {
    name: "unlurk",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        const index = randomRange(0, unlurk.length - 1);
        const response = unlurk[index].replace(/<username>/g, userstate["display-name"]!);
        return client.say(channel, `/me ${response}`);
    }
} as Command;
