import { Command } from "../../interfaces/Command";
import { randomRange, setCooldown } from "../../utils/utils";

const lurk = [
    "<username> has entered lurk mode! Enjoy your lurk.",
    "Have a good lurk, <username>! I'll be seeing you in the shadows of stream ヾ(･ω･｡)ｼ",
    "Hope you have a great lurk, <username>. See you later!",
    "Enjoy your lurk <username>! Take care and we hope to see you again (ノ^∀^)ノ*"
];

export default {
    name: "lurk",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        const index = randomRange(0, lurk.length - 1);
        const response = lurk[index].replace(/<username>/g, userstate["display-name"]!);
        return client.say(channel, `/me ${response}`);
    }
} as Command;
