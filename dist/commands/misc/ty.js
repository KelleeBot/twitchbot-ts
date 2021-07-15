"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const compliments_json_1 = require("../../config/compliments.json");
exports.default = {
    name: "ty",
    category: "misc",
    cooldown: 15,
    execute({ client, channel, args, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        const index = utils_1.randomRange(0, compliments_json_1.COMPLIMENTS.length - 1);
        if (!args.length) {
            const content = compliments_json_1.COMPLIMENTS[index].replace(/<user>/g, userstate["display-name"]);
            return client.say(channel, `/me ${content} KPOPheart`);
        }
        const user = args[0].startsWith("@")
            ? args[0].replace(/@/g, "").trim()
            : args[0].trim();
        if (user.toLowerCase() === `${process.env.BOT_USERNAME}`.toLowerCase()) {
            return client.say(channel, "/me You better thank me. It's a lot of work being a bot on here.");
        }
        const content = compliments_json_1.COMPLIMENTS[index].replace("<user>", user);
        return client.say(channel, `/me ${content} KPOPheart`);
    }
};
