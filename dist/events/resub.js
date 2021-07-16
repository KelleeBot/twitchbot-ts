"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, channel, username, streakMonths, message, userstate, methods) => {
    const cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    const shareStreak = userstate["msg-param-should-share-streak"];
    return client.say(channel, `/me Thank you @${username} for the ${cumulativeMonths} month${cumulativeMonths != 1 ? "s" : ""} sub! ${shareStreak
        ? `They are now on a ${streakMonths} month${streakMonths != 1 ? "s" : ""} streak!`
        : ""} PrideRise`);
};
