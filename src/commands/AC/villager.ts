import fetch from "node-fetch";
import stringSimilarity from "string-similarity";
import { Villagers } from "../../interfaces";
import { Command } from "../../interfaces/Command";
import { log, setCooldown } from "../../utils/utils";

let villagers: string[] = [];

export default {
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
    async execute({ client, userstate, channel, args }) {
        let query = args.join(" ").toLowerCase().trim();
        if (query.includes(" ")) {
            query = query.replace(/ +/g, "_");
        }

        const data = await fetchVillagerName(query);
        if (!data.length) {
            const matches = stringSimilarity.findBestMatch(query, await fetchAllVillagerNames());
            const options = matches.ratings
                .filter((v) => v.rating >= 0.3)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, Math.min(5, matches.ratings.length));

            if (!options.length)
                return client.say(channel, `/me I couldn't find that villager kellee1Cry`);

            const { bestMatch } = matches;
            return client.say(
                channel,
                `/me I could not find a villager with that name. Maybe you meant ${bestMatch.target.replace(
                    /\b(\w)/g,
                    (char) => char.toUpperCase()
                )}?`
            );
        }

        setCooldown(client, this, channel, userstate);
        const { name, personality, species, phrase, url } = data[0];
        return client.say(
            channel,
            `/me ${name} is a ${personality.toLowerCase()} ${species.toLowerCase()}, ${phrase}! More info: ${url}`
        );
    }
} as Command;

const fetchAllVillagerNames = async () => {
    if (villagers.length) return villagers;

    const resp = await fetch("https://api.nookipedia.com/villagers", {
        method: "GET",
        headers: {
            "X-API-KEY": `${process.env.NOOK_API_KEY}`,
            "Accept-Version": "2.0.0"
        }
    });
    const data = await resp.json();
    villagers = data.map((villager: Villagers) => villager.name.toLowerCase());

    return villagers;
};

const fetchVillagerName = async (name: string) => {
    const resp = await fetch(
        `https://api.nookipedia.com/villagers?name=${encodeURIComponent(
            name.toLowerCase()
        )}&nhdetails=true`,
        {
            method: "GET",
            headers: {
                "X-API-KEY": `${process.env.NOOK_API_KEY}`,
                "Accept-Version": "2.0.0"
            }
        }
    );
    return await resp.json();
};
