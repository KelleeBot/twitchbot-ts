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
    name: "color",
    aliases: ["setcolor"],
    category: "Mod",
    isModOnly: true,
    arguments: [
        {
            type: "STRING",
            prompt: "Please specify a color to change my color to.",
            amount: 1
        }
    ],
    execute({ client, channel, args }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const color = yield client.color(args[0]);
                return client.say(channel, `/me My color has been changed to ${color}.`);
            }
            catch (e) {
                utils_1.log("ERROR", "./src/commands/mod/color.ts", e);
                return client.say(channel, "/me Color must be in one of the following: Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen.");
            }
        });
    }
};
