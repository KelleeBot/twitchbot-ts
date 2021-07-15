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
const utils_1 = require("../utils/utils");
exports.default = (client, channel, username, viewers) => __awaiter(void 0, void 0, void 0, function* () {
    client.say(channel, `/me Incoming raid! PrideRise Thank you @${username} for raiding the channel with ${viewers} viewer${viewers !== 1 ? "s" : ""}! Welcome raiders!`);
    const game = yield gamePlayed(username);
    return client.say(channel, `/me kellee1Love Be sure to show ${username} some love and follow them at https://www.twitch.tv/${username.toLowerCase()} They were last playing ${game} kellee1Love`);
});
const gamePlayed = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield node_fetch_1.default(`https://beta.decapi.me/twitch/game/${username.toLowerCase()}`);
            const data = yield resp.text();
            resolve(data);
        }
        catch (e) {
            utils_1.log("ERROR", ".src/events/raided.ts", e.message);
            reject(e);
        }
    }));
});
