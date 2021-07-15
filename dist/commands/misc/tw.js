"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "tw",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, "/me This game may contain material that may be triggering to some people; including: suicide, death and mental health disorders. If any of these topics are triggering for you, please feel free to leave the stream. We love and appreciate you. ʕっ•ᴥ•ʔっ");
    }
};
