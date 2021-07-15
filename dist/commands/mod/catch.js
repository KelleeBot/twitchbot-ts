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
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("../../utils/utils");
const pokeBalls = [
    "Master Ball",
    "Ultra Ball",
    "Great Ball",
    "Poke Ball",
    "Safari Ball",
    "Park Ball",
    "Sport Ball"
];
const vowelRegex = "^[aieouAIEOU].*";
exports.default = {
    name: "catch",
    aliases: ["redeempokemon"],
    category: "Mod",
    cooldown: 5,
    globalCooldown: true,
    isModOnly: true,
    arguments: [
        {
            type: "STRING",
            prompt: "Please specify a user."
        }
    ],
    execute({ client, channel, args, userstate }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = args[0].startsWith("@") ? args[0].replace(/@/g, "").trim() : args[0].trim();
            const index = utils_1.randomRange(0, pokeBalls.length - 1);
            const pokedexNum = Math.floor(Math.random() * 899); // 898 Pokemon
            const pokeBall = pokeBalls[index];
            const pokemon = yield getRandomPokemon(pokedexNum);
            const obj = {
                channel: channel.slice(1),
                user: user.toLowerCase()
            };
            yield pokemonSchema_1.default.findOneAndUpdate(obj, Object.assign(Object.assign({}, obj), { $addToSet: {
                    pokemons: {
                        pokedexNum,
                        name: pokemon,
                        caughtWith: pokeBall,
                        caughtOn: new Date()
                    }
                } }), {
                upsert: true
            });
            utils_1.setCooldown(client, this, channel, userstate);
            const numPokemons = yield pokemonSchema_1.default.findOne(obj);
            const { pokemons } = numPokemons;
            return client.say(channel, `/me ${user} has captured a${pokemon.match(vowelRegex) ? "n" : ""} ${pokemon} by using a${pokeBall.match(vowelRegex) ? "n" : ""} ${pokeBall}! PridePog PridePog Hope you take good care of your Pokémon! 2020Rivalry You have now caught a total of ${pokemons.name.length} Pokémon!`);
        });
    }
};
const getRandomPokemon = (pokedexNum) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = yield node_fetch_1.default(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokedexNum)}`);
            const result = yield body.json();
            const pokemon = result.species.name.replace(/\b(\w)/g, (char) => char.toUpperCase());
            resolve(pokemon);
        }
        catch (e) {
            utils_1.log("ERROR", ".src/commands/mod/catch.ts", e.message);
            reject(e);
        }
    }));
});
