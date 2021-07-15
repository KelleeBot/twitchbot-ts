"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "bean",
    category: "AC",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Bean's custom designs: https://docs.google.com/document/d/1wBXPd7_KiKB-yZ_CLnI6WOMemdsFC4VGvdQBDtkLNSE/edit");
    }
};
