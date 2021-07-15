"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "feed",
    category: "Clips",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me Feed ur animals SCRUB https://www.twitch.tv/kelleelu/clip/CrispyBreakableWolverineSeemsGood");
    }
};
