"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "raid",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Raiding with love kellee1Love kellee1Love");
    }
};
