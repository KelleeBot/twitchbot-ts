import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { log, setCooldown, errorMessage, getCurrentGame } from "../../utils/utils";

export default {
    name: "so",
    aliases: ["shoutout"],
    category: "Mod",
    isModOnly: true,
    cooldown: 3,
    globalCooldown: true,
    arguments: [
        {
            type: "STRING",
            prompt: "And who shall we shout out?"
        }
    ],
    async execute({ client, channel, userstate, args }) {
        const { username } = userstate;
        const user = args[0].startsWith("@") ? args[0].replace(/@/g, "").trim() : args[0].trim();

        try {
            const game = (await getCurrentGame(user).catch((e) =>
                log("ERROR", `${__filename}`, `An error has occurred: ${e}`)
            )) as string;

            if (user.toLowerCase() == username.toLowerCase()) {
                return client.say(channel, "/me You can't shout yourself out Kappa");
            }

            if (user.toLowerCase() == process.env.CHANNEL_NAME!.toLowerCase()) {
                return client.say(
                    channel,
                    "/me You can't shout the streamer out on their own channel Kappa"
                );
            }

            if (user.toLowerCase() == process.env.BOT_USERNAME!.toLowerCase()) {
                return client.say(
                    channel,
                    "/me Don't shout me out please, I don't like the attention."
                );
            }

            if (!game || !game.length || typeof game === "undefined") {
                return client.say(
                    channel,
                    `/me ${user} doesn't stream :( but you should go give them a follow anyways! https://www.twitch.tv/${user}`
                );
            }

            if (
                game.toLowerCase().includes("no user") ||
                game.toLowerCase().includes("not found")
            ) {
                return client.say(channel, `/me I couldn't find that user kellee1Cry`);
            }

            setCooldown(client, this, channel, userstate);
            return client.say(
                channel,
                `/me kellee1Love Be sure to show ${user} some love and follow them at https://www.twitch.tv/${user} They were last playing ${game} kellee1Love`
            );
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            return errorMessage(client, channel);
        }
    }
} as Command;
