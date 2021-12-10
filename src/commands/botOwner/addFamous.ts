import { Command } from "../../interfaces";

export default {
    name: "addFamous",
    aliases: ["famous"],
    category: "Bot Owner",
    devOnly: true,
    hideCommand: true,
    canNotDisable: true,
    arguments: [
        {
            type: "STRING",
            prompt: "The famous bot link to add."
        }
    ],
    async execute({ client, channel, args }) {
        const text = args.join(" ");
        await client.DBFamousLinks.findByIdAndUpdate(
            "famousLinks",
            { $push: { famous: text.toLowerCase() } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        client.famousCache.push(text.toLowerCase());
        return client.say(channel, `/me You have added "${text}" to the famous links database.`);
    }
} as Command;
