import { Command } from "../../interfaces/Command";
import pokemonSchema from "../../models/pokemonSchema";
import fetch from "node-fetch";
import { randomRange, setCooldown, log } from "../../utils/utils";

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

export default {
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
    async execute({ client, channel, args, userstate }) {
        const user = args[0].startsWith("@") ? args[0].replace(/@/g, "").trim() : args[0].trim();
        const index = randomRange(0, pokeBalls.length - 1);
        const pokedexNum = Math.floor(Math.random() * 899); // 898 Pokemon
        const pokeBall = pokeBalls[index];
        const pokemon = await getRandomPokemon(pokedexNum);

        const obj = {
            channel: channel.slice(1),
            user: user.toLowerCase()
        };

        await pokemonSchema.findOneAndUpdate(
            obj,
            {
                ...obj,
                $addToSet: {
                    pokemons: {
                        pokedexNum,
                        name: pokemon,
                        caughtWith: pokeBall,
                        caughtOn: new Date()
                    }
                }
            },
            {
                upsert: true
            }
        );

        setCooldown(client, this, channel, userstate);
        const numPokemons = await pokemonSchema.findOne(obj);
        const { pokemons } = numPokemons;
        return client.say(
            channel,
            `/me ${user} has captured a${
                pokemon.match(vowelRegex) ? "n" : ""
            } ${pokemon} by using a${
                pokeBall.match(vowelRegex) ? "n" : ""
            } ${pokeBall}! PridePog PridePog Hope you take good care of your Pokémon! 2020Rivalry You have now caught a total of ${
                pokemons.name.length
            } Pokémon!`
        );
    }
} as Command;

const getRandomPokemon = async (pokedexNum: number): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokedexNum)}`
            );
            const result = await body.json();
            const pokemon = result.species.name.replace(/\b(\w)/g, (char: string) =>
                char.toUpperCase()
            );
            resolve(pokemon);
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            reject(e);
        }
    });
};
