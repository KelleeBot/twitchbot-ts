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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "so",
    aliases: ["shoutout"],
    category: "Mod",
    isModOnly: true,
    cooldown: 3,
    globalCooldown: true,
    arguments: [
        {
            type: "STRING",
            prompt: "And who shall we shout out?"
        }
    ],
    execute({ client, channel, userstate, args }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = userstate;
            const user = args[0].startsWith("@") ? args[0].replace(/@/g, "").trim() : args[0].trim();
            try {
                const res = yield node_fetch_1.default(`https://beta.decapi.me/twitch/game/${encodeURIComponent(user)}`);
                const data = yield res.text();
                if (user.toLowerCase() == username.toLowerCase()) {
                    return client.say(channel, "/me You can't shout yourself out Kappa");
                }
                if (user.toLowerCase() == process.env.CHANNEL_NAME.toLowerCase()) {
                    return client.say(channel, "/me You can't shout the streamer out on their own channel Kappa");
                }
                if (user.toLowerCase() == process.env.BOT_USERNAME.toLowerCase()) {
                    return client.say(channel, "/me Don't shout me out please, I don't like the attention.");
                }
                if (!data || data == "") {
                    return client.say(channel, `/me ${user} doesn't stream :( but you should still go give them a follow anyways! https://www.twitch.tv/${user}`);
                }
                if (data.toLowerCase().includes("no user") ||
                    data.toLowerCase() == "404 page not found") {
                    return client.say(channel, "/me I couldn't find that user kellee1Cry");
                }
                utils_1.setCooldown(client, this, channel, userstate);
                return client.say(channel, `/me kellee1Love Be sure to show ${user} some love and follow them at https://www.twitch.tv/${user} They were last playing ${data} kellee1Love`);
            }
            catch (e) {
                utils_1.log("ERROR", "./src/commands/mod/so.ts", e.message);
                return utils_1.errorMessage(client, channel);
            }
        });
    }
};
