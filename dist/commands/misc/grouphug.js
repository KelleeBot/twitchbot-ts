"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "grouphug",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        return client.say(channel, `/me ${userstate["display-name"]} gives everyone a group hug! I love you ʕっ•ᴥ•ʔっ kellee1Love`);
    }
};
