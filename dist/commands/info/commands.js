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
    name: "commands",
    category: "Info",
    hideCommand: true,
    cooldown: 15,
    execute({ client, channel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelInfo = yield utils_1.getChannelInfo(client, channel);
            const prefix = channelInfo.prefix;
            const commands = [];
            for (const [key, value] of client.commands.entries()) {
                if (!value.isModOnly && !value.hideCommand) {
                    commands.push(`${prefix}${key}`);
                }
            }
            return client.say(channel, `/me ${commands.sort().join(", ")}`);
        });
    }
};
