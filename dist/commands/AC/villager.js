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
    name: "villager",
    category: "Animal Crossing",
    cooldown: 15,
    arguments: [
        {
            type: "STRING",
            prompt: "Please specify a villager name.",
            id: "villager"
        }
    ],
    execute({ client, userstate, channel, args }) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.setCooldown(client, this, channel, userstate);
            let query = args.join(" ").trim();
            if (query.includes(" ")) {
                query = query.replace(/ +/g, "_");
            }
            if (query.toLowerCase() === "etoile") {
                query = "Étoile";
            }
            try {
                const resp = yield node_fetch_1.default(`https://api.nookipedia.com/villagers?name=${encodeURIComponent(query.toLowerCase())}&nhdetails=true`, {
                    method: "GET",
                    headers: {
                        "X-API-KEY": `${process.env.NOOK_API_KEY}`,
                        "Accept-Version": "2.0.0"
                    }
                });
                const data = yield resp.json();
                if (!data)
                    return client.say(channel, "/me I could not find a villager with that name.");
                const { name, personality, species, phrase, url } = data[0];
                return client.say(channel, `/me ${name} is a ${personality.toLowerCase()} ${species.toLowerCase()}, ${phrase}! More info: ${url}`);
            }
            catch (e) {
                utils_1.log("ERROR", "./src/commands/AC/villager.ts", e.message);
                return client.say(channel, "/me I could not find a villager with that name.");
            }
        });
    }
};
