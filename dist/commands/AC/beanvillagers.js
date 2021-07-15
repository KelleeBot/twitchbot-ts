"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
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
exports.default = {
    name: "beanvillagers",
    category: "AC",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, `/me Bean island's villagers are: ${villagers.sort().join(", ")}`);
    }
};
