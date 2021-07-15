"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const unlurk = [
    "Welcome back from your lurk <username>! Great to see you again!",
    "Welcome back <username>! Hope you enjoyed your lurk. You've missed absolutely nothing.",
    "<username> has exited lurk mode. Welcome back, we've missed you ʕっ•ᴥ•ʔっ"
];
exports.default = {
    name: "unlurk",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        const index = utils_1.randomRange(0, unlurk.length - 1);
        const response = unlurk[index].replace(/<username>/g, userstate["display-name"]);
        return client.say(channel, `/me ${response}`);
    }
};
