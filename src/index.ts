import "./interfaces/Prototype";

import * as dotenv from "dotenv";

import { Client } from "./Client";
import { log, registerFeatures } from "./utils";

dotenv.config();

(async () => {
	// try {
	// 	await mongoose.connect(`${process.env.MONGO_PATH}`);
	// 	log("SUCCESS", `${__filename}`, "Successfully connected to the database.");
	// } catch (e) {
	// 	log("ERROR", `${__filename}`, `Error connecting to database: ${e}`);
	// 	process.exit(1);
	// }

	try {
		const opts = {
			options: {
				debug: true,
			},
			connection: {
				reconnect: true,
				secure: true,
				timeout: 180000,
				reconnectDecay: 1.4,
				reconnectInterval: 1000,
			},
			identity: {
				username: `${process.env.BOT_USERNAME}`,
				password: `${process.env.OAUTH_TOKEN}`,
			},
			channels: [`${process.env.CHANNEL_NAME}`],
		};

		const client = new Client(opts);
		await client.connect();

		client.commands = new Map();
		client.categories = new Map();
		client.channelInfoCache = new Map();

		client.channelCooldowns = new Map();
		client.globalCooldowns = new Map();

		// await registerEvents(client, "../events");
		// await registerCommands(client, "../commands");
		await registerFeatures(client, "../features");
	} catch (e) {
		log("ERROR", `${__filename}`, `An error has occurred: ${e}.`);
	}
	log("SUCCESS", `${__filename}`, "Successfully loaded all commands, events, schemas, and connected to MongoDB.");
})();
