"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, channel, target, viewers) => {
    return client.say(channel, `/me We are now hosting ${target} with ${viewers} viewer${viewers != 1 ? "s" : ""}!`);
};
