"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const config_json_1 = require("../config/config.json");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
exports.default = (client, channel, userstate, message, self) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (self || userstate.bot)
            return;
        checkTwitchChat(client, userstate, message, channel);
        let channelInfo = yield utils_1.getChannelInfo(client, channel.slice(1));
        if (message === "kellee1Glare") {
            return client.say(channel, `kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare`);
        }
        // if (message.toLowerCase() === `@${process.env.BOT_USERNAME}`) {
        //   return client.say(
        //     channel,
        //     `/me My prefix for this channel is "${channelInfo.prefix}".`
        //   );
        // }
        const prefixRegex = new RegExp(`^(@${process.env.BOT_USERNAME}|${escapeRegex(channelInfo.prefix)})`);
        if (!prefixRegex.test(message))
            return;
        //@ts-ignore
        const [, matchedPrefix] = message.match(prefixRegex);
        let msgArgs = message.slice(matchedPrefix.length).trim().split(/ +/);
        let cmdName = msgArgs.shift().toLowerCase();
        const command = client.commands.get(cmdName) ||
            (channelInfo.commandAlias
                ? client.commands.get(channelInfo.commandAlias[cmdName])
                : false);
        if (!command)
            return;
        if (!userstate.mod &&
            !utils_1.isBroadcaster(userstate.username) &&
            command.isModOnly &&
            !config_json_1.devs.includes(userstate.username))
            return;
        if (command.devOnly && !config_json_1.devs.includes(userstate.username))
            return;
        if (channelInfo.disabledCommands.includes(command.name))
            return;
        const cd = utils_1.getCooldown(client, command);
        let cooldowns;
        if (cd) {
            if (typeof command.globalCooldown === "undefined" || command.globalCooldown) {
                if (!client.globalCooldowns.has(command.name)) {
                    client.globalCooldowns.set(command.name, new Map());
                }
                cooldowns = client.globalCooldowns;
            }
            else {
                if (!client.channelCooldowns.has(channel)) {
                    client.channelCooldowns.set(channel, new Map());
                }
                cooldowns = client.channelCooldowns.get(channel);
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Map());
                }
            }
            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = cd * 1000;
            if (timestamps.has(userstate.username)) {
                const expirationTime = timestamps.get(userstate.username) + cooldownAmount;
                if (now < expirationTime) {
                    return console.log(`${command.name} on cooldown for another ${utils_1.msToTime(expirationTime - now)}.`);
                }
            }
        }
        let flags;
        if (command.arguments) {
            flags = utils_1.processArguments(message, msgArgs, command.arguments);
        }
        if (flags && flags.invalid) {
            if (flags.prompt) {
                return client.say(channel, `/me ${flags.prompt}`);
            }
        }
        return command.execute({
            client,
            userstate,
            channel,
            message,
            args: msgArgs,
            //@ts-ignore
            flags
        });
    }
    catch (e) {
        console.log(e);
    }
});
const checkTwitchChat = (client, userstate, message, channel) => {
    if (userstate.mod || utils_1.isBroadcaster(userstate.username))
        return;
    if (message.length > 250) {
        client
            .deletemessage(channel, userstate["id"])
            .then((data) => {
            client.say(channel, `/me ${userstate["display-name"]}, the mods here don't like reading long messages. Please try to keep it short and sweet.`);
        })
            .catch((e) => {
            utils_1.log("ERROR", ".src/events/message.ts", e);
        });
    }
    if (message.toLowerCase().includes("bigfollows .com") ||
        message.toLowerCase().includes("bigfollows.com") ||
        message.toLowerCase().includes("bigfollows . com") ||
        message.includes("Wanna b̔ecome̤ famoͅus̈́?̿ Bu͗y f̭ollow̮ers, primes and viewers on ̫" //https://clck.ru/R9gQV ͉(bigfollows .com)̰"
        )) {
        client
            .ban(channel, userstate.username)
            .then((data) => {
            client.say(channel, `/me No, I don't wanna become famous. Good bye!`);
        })
            .catch((e) => {
            utils_1.log("ERROR", ".src/events/message.js", e);
        });
    }
    if (message ===
        "Hey. I want to offer you a boost on twitch, a stable number of viewers, there are chat bots. I will offer a price lower than any competitor. Auto-start when stream became online.Pay only for the time when the stream is online.Pay by the hour! I'll provide a free test.The client has access to the panel to launch, and can control the process himself!For tech problems, a full refund. Telegram @Twitch_viewers Discord Twitch#3227") {
        client
            .ban(channel, userstate.username)
            .then((data) => {
            client.say(channel, `/me No, I don't want a boost on Twitch. Get outta here!`);
        })
            .catch((e) => {
            utils_1.log("ERROR", ".src/events/message.js", e);
        });
    }
};
