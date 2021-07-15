"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "resources",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, `/me Here is a list of resources to help BIPOC and LGBTQ+ communities. If you have more resources, please DM Kéllee. https://kellee.carrd.co/`);
    }
};
