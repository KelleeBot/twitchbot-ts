"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "help",
    category: "AC",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Stuck in AC and need some help? Check out this document: https://docs.google.com/document/d/1tQfQvL-RunGCGc_23opcwYpHmR-UvHr9NQn466c4HwA/edit?usp=sharing");
    }
};
