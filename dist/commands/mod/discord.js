"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "discord",
    category: "Mod",
    isModOnly: true,
    execute({ client, channel }) {
        return client.say(channel, "/me Come join the Lunar Circle! https://discord.gg/M8fxKXq");
    }
};
