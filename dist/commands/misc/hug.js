"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const aaronHugResponses = [
    "iaraaron runs away because <username> just tried to hug him! No hugging iaraaron allowed! kellee1Glare",
    "iaraaron requests that <username> stay at least 6 feet away from him during these times. Hug rejected.",
    "Did you really just try to hug iaraaron? You wanna get banned? kellee1Glare",
    "iaraaron is social distancing and does not want <username> invading his bubble. Please do not try to hug him again."
];
const kelleebotHugResponses = [
    "<username> please don't hug me. I don't like to be touched.",
    "I'm a bot. I don't need your hugs, <username>.",
    "Get your dirty stinking hands off of me, <username>.",
    "A hug? For me? No, thanks."
];
exports.default = {
    name: "hug",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, args, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        if (!args.length) {
            return client.say(channel, `/me ${userstate["display-name"]} hugs themselves because they didn't specify who to hug.`);
        }
        const user = args[0].startsWith("@")
            ? args[0].replace(/@/g, "").trim()
            : args[0].trim();
        if ((userstate.username.toLowerCase() == "kelleeluna" ||
            userstate.username.toLowerCase() == "pineappleontilt") &&
            user.toLowerCase() == "iaraaron") {
            return client.say(channel, `/me ${userstate["display-name"]} gives ${user} a great big hug. I love you ʕっ•ᴥ•ʔっ kellee1Love`);
        }
        if (user.toLowerCase() === "iaraaron" ||
            utils_1.replaceChars(user).includes("aaron")) {
            const index = utils_1.randomRange(0, aaronHugResponses.length - 1);
            const response = aaronHugResponses[index].replace(/<username>/g, userstate["display-name"]);
            return client.say(channel, `/me ${response}`);
        }
        if (userstate.username.toLowerCase() == user.toLowerCase() ||
            user.toLowerCase() == "me") {
            return client.say(channel, `/me ${userstate["display-name"]} gives themselves a hug because they are lonely.`);
        }
        if (user.toLowerCase() === `${process.env.BOT_USERNAME}`.toLowerCase()) {
            const index = utils_1.randomRange(0, kelleebotHugResponses.length - 1);
            const response = kelleebotHugResponses[index].replace(/<username>/g, userstate["display-name"]);
            return client.say(channel, `/me ${response}`);
        }
        return client.say(channel, `/me kellee1Love ${userstate["display-name"]} hugs ${user} PrideFlower. I love you ʕっ•ᴥ•ʔっ kellee1Love`);
    }
};
