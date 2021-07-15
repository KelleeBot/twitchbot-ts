import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

const villagers = [
    "Mitzi",
    "Francine",
    "Genji",
    "Dobie",
    "Molly",
    "Apollo",
    "Stitches",
    "Marshal",
    "Deirdre",
    "Bob"
];

export default {
    name: "beanvillagers",
    category: "AC",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        return client.say(
            channel,
            `/me Bean island's villagers are: ${villagers.sort().join(", ")}`
        );
    }
} as Command;
