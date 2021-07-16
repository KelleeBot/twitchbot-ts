import mongoose from "mongoose";
import tmi from "tmi.js";
import { Client } from "./Client";
import { registerCommands, registerEvents } from "./utils/registry";
import { log } from "./utils/utils";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
    try {
        mongoose.connect(`${process.env.MONGO_PATH}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        log("SUCCESS", "./src/index.ts", "Successfully connected to the database.");
    } catch (e) {
        log("ERROR", "./src/index.ts", `Error connecting to database: ${e.message}`);
        process.exit(1);
    }

    try {
        const opts = {
            options: {
                debug: true
            },
            connection: {
                reconnect: true,
                secure: true,
                timeout: 180000,
                reconnectDecay: 1.4,
                reconnectInterval: 1000
            },
            identity: {
                username: `${process.env.BOT_USERNAME}`,
                password: `${process.env.OAUTH_TOKEN}`
            },
            channels: [`${process.env.CHANNEL_NAME}`]
        };

        const client = new tmi.client(opts) as Client;
        client.connect();

        client.commands = new Map();
        client.categories = new Map();
        client.channelInfoCache = new Map();

        client.DBChannel = (await import("./models/channelSchema")).default;
        client.DBBlacklist = (await import("./models/blacklistSchema")).default;

        const blacklistFetch = await client.DBBlacklist.findByIdAndUpdate(
            "blacklist",
            {},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        //@ts-ignore
        client.blacklistCache = new Set(blacklistFetch.blacklisted);

        client.channelCooldowns = new Map();
        client.globalCooldowns = new Map();

        await registerEvents(client, "../events");
        await registerCommands(client, "../commands");
    } catch (e) {
        log("ERROR", "./src/index.ts", `An error has occurred: ${e.message}.`);
    }
    log(
        "SUCCESS",
        "./src/index.ts",
        "Successfully loaded all commands, events, schemas, and connected to MongoDB."
    );
})();
