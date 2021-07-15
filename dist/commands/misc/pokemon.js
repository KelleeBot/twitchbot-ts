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
const pokemonSchema_1 = __importDefault(require("../../models/pokemonSchema"));
const utils_1 = require("../../utils/utils");
exports.default = {
    name: "pokemon",
    category: "Misc",
    cooldown: 15,
    execute({ client, channel, userstate }) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                channel: channel.slice(1),
                user: userstate.username.toLowerCase()
            };
            try {
                const result = yield pokemonSchema_1.default.find(obj);
                if (!result.length) {
                    return client.say(channel, `/me ${userstate["display-name"]}, you have not caught any Pokémon's yet.`);
                }
                const totalPokemons = result[0].pokemons.name.length;
                const pokemons = result[0].pokemons.name
                    .map((m) => m)
                    .slice(0, 5)
                    .join(", ");
                utils_1.setCooldown(client, this, channel, userstate);
                return client.say(channel, `/me ${userstate["display-name"]}, you have caught a total of ${totalPokemons} Pokémon! Here is your Pokédex (first 5): ${pokemons}.`);
            }
            catch (e) {
                utils_1.log("ERROR", ".src/commands/misc/pokemon.ts", e.message);
                return utils_1.errorMessage(client, channel);
            }
        });
    }
};
