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
const prefixRegExp = /^[a-zA-Z0-9!@#\$%\^\&*\)\(\?+=_-]{1,15}$/;
exports.default = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "Mod",
    cooldown: 30,
    globalCooldown: true,
    isModOnly: true,
    arguments: [
        {
            type: "STRING",
            prompt: "Please enter a new prefix."
        }
    ],
    execute({ client, channel, args, userstate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prefixRegExp.test(args[0])) {
                return client.say(channel, "/me That command prefix is not allowed. Please try again.");
            }
            const channelInfo = yield utils_1.getChannelInfo(client, channel);
            if (channelInfo.prefix == args[0]) {
                return client.say(channel, "/me Please make sure to enter a new prefix.");
            }
            utils_1.setCooldown(client, this, channel, userstate);
            yield client.DBChannel.findByIdAndUpdate(channel, {
                $set: {
                    prefix: args[0]
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true });
            channelInfo.prefix = args[0];
            client.channelInfoCache.set(channel, channelInfo);
            return client.say(channel, `/me Channel prefix has been successfully set to "${args[0]}".`);
        });
    }
};
