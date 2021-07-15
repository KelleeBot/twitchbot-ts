"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "socials",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        client.say(channel, "/me Follow me on Twitter! https://twitter.com/kelleelune");
        // client.say(
        //   channel,
        //   `/me Don't forget to subscribe to me on YouTube as well! https://www.youtube.com/channel/UCQymVHcUQZ3fzHMZMZ-v0Vw`
        // );
        client.say(channel, "/me I also have an Instagram account where I post about Animal Crossing a lot! https://www.instagram.com/kelleelune/");
    }
};
