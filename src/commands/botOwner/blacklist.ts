import { Command } from "../../interfaces";
import { log, getUserInfo, errorMessage } from "../../utils";
import fetch from "node-fetch";

const headers = {
    "client-id": process.env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${process.env.TWITCH_BEARER_TOKEN}`
};

export default {
    name: "blacklist",
    category: "Bot Owner",
    devOnly: true,
    hideCommand: true,
    canNotDisable: true,
    arguments: [
        {
            type: "STRING",
            prompt: "Please specify either add or remove.",
            words: ["add", "remove"]
        },
        {
            type: "STRING",
            prompt: "Please specify the Twitch user."
        }
    ],
    async execute({ client, channel, args, userstate }) {
        const user = args[1].startsWith("@") ? args[1].replace("@", "") : args[1];
        try {
            let userInfo = await getUserInfo(client, user);

            switch (args[0].toLowerCase()) {
                case "add":
                    if (user.toLowerCase() === userstate.username.toLowerCase()) {
                        return client.say(channel, "/me You cannot blacklist yourself.");
                    }

                    if (userInfo.isBlacklisted) {
                        return client.say(
                            channel,
                            `/me Looks like ${user} is already blacklisted.`
                        );
                    }

                    userInfo.isBlacklisted = true;
                    await client.DBUser.findByIdAndUpdate(
                        user.toLowerCase(),
                        { $set: { isBlacklisted: true } },
                        { new: true, upsert: true, setDefaultsOnInsert: true }
                    );
                    return client.say(channel, `/me You have successfully blacklisted ${user}.`);
                case "remove":
                    if (!userInfo.isBlacklisted) {
                        return client.say(channel, `/me ${user} is currently not blacklisted.`);
                    }

                    userInfo.isBlacklisted = false;
                    await client.DBUser.findByIdAndUpdate(
                        user.toLowerCase(),
                        { $set: { isBlacklisted: false } },
                        { new: true, upsert: true, setDefaultsOnInsert: true }
                    );
                    return client.say(channel, `/me You have succesfully whitelisted ${user}.`);
            }
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;
