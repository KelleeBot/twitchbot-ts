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
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "command",
    category: "Bot Owner",
    devOnly: true,
    hideCommand: true,
    execute({ client, channel, userstate, args }) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelName = channel.slice(1);
            let channelInfo = yield utils_1.getChannelInfo(client, channel);
            const disabledCommands = channelInfo.disabledCommands;
            if (!args[0]) {
                return client.say(channel, `/me ${disabledCommands.length == 0
                    ? "There are no disabled commands for this channel."
                    : `${disabledCommands.join(", ")}`}`);
            }
            if (!args[1]) {
                return client.say(channel, "/me Please specify a command.");
            }
            const command = client.commands.get(args[1].toLowerCase());
            if (!command) {
                return client.say(channel, `/me Command "${args[1]}" does not exist.`);
            }
            if (command.canNotDisable) {
                return client.say(channel, `/me The command "${args[1]}" can not be disabled.`);
            }
            utils_1.setCooldown(client, this, channel, userstate);
            switch (args[0].toLowerCase()) {
                case "disable":
                    if (disabledCommands.includes(command.name)) {
                        return client.say(channel, `/me The command "${command.name}" is already disabled.`);
                    }
                    yield client.DBChannel.findByIdAndUpdate(channelName, { $push: { disabledCommands: command.name } }, { new: true, upsert: true, setDefaultsOnInsert: true });
                    channelInfo.disabledCommands.push(command.name);
                    client.channelInfoCache.set(channelName, channelInfo);
                    client.say(channel, `/me The command "${command.name}" has been disabled.`);
                    break;
                case "enable":
                    if (!disabledCommands.includes(command.name)) {
                        return client.say(channel, `/me The command "${command.name}" is already enabled.`);
                    }
                    channelInfo = yield client.DBChannel.findByIdAndUpdate(channelName, { $pull: { disabledCommands: command.name } }, { new: true, upsert: true, setDefaultsOnInsert: true });
                    client.channelInfoCache.set(channelName, channelInfo);
                    client.say(channel, `/me The command "${command.name}" has been enabled.`);
                    break;
                default:
                    client.say(channel, '/me Please specify either "enable" or "disable".');
                    break;
            }
            return;
        });
    }
};
