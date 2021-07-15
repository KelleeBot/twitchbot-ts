"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const lurk = [
    "<username> has entered lurk mode! Enjoy your lurk.",
    "Have a good lurk, <username>! I'll be seeing you in the shadows of stream ヾ(･ω･｡)ｼ",
    "Hope you have a great lurk, <username>. See you later!",
    "Enjoy your lurk <username>! Take care and we hope to see you again (ノ^∀^)ノ*"
];
exports.default = {
    name: "lurk",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        const index = utils_1.randomRange(0, lurk.length - 1);
        const response = lurk[index].replace(/<username>/g, userstate["display-name"]);
        return client.say(channel, `/me ${response}`);
    }
};
