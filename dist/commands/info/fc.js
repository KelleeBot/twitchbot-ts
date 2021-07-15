"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "fc",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Kellee's Switch friend code: SW-1603-0974-7504");
    }
};
