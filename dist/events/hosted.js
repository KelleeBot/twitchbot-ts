"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, channel, username, viewers, _autohost) => {
    return client.say(channel, `/me Thank you @${username} for hosting the stream with  ${viewers} viewer${viewers != 1 ? "s" : ""}! kellee1Love`);
};
