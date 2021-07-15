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
    name: "dadadvice",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                utils_1.setCooldown(client, this, channel, userstate);
                const resp = yield node_fetch_1.default(`https://api.adviceslip.com/advice`);
                const data = yield resp.json();
                return client.say(channel, `/me ${data["slip"]["advice"]}`);
            }
            catch (e) {
                utils_1.log("ERROR", "./src/commands/misc/dadadvice.ts", e.message);
                return utils_1.errorMessage(client, channel);
            }
        });
    }
};
