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
const utils_1 = require("../../utils/utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = {
    name: "blind",
    category: "Misc",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.setCooldown(client, this, channel, userstate);
            const game = yield getGame(channel);
            return client.say(channel, `/me Kéllee is doing a blind playthrough of ${game}! We ask that you PLEASE don't give Kéllee any hints, tips, tricks, or spoilers whatsoever unless asked and let her figure stuff out on her own! Thank you!`);
        });
    }
};
const getGame = (channel) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = yield node_fetch_1.default(`https://beta.decapi.me/twitch/game/${channel.slice(1).toLowerCase()}`);
            const result = yield body.text();
            if (result) {
                resolve(result);
            }
            else {
                reject("There was a problem retrieving game data.");
            }
        }
        catch (e) {
            utils_1.log("ERROR", "./command/misc/blind.js", e.message);
        }
    }));
};
