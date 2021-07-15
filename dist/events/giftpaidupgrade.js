"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, channel, username, _sender, userstate) => {
    return client.say(channel, `/me Thank you @${username} for continuing your gifted sub from ${userstate["msg-param-sender-name"]}!`);
};
