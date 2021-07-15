import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { log, setCooldown } from "../../utils/utils";

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
    const user = args[0].startsWith("@")
      ? args[0].replace(/@/g, "").trim()
      : args[0].trim();

    try {
      const res = await fetch(
        `https://beta.decapi.me/twitch/game/${encodeURIComponent(user)}`
      );
      const data = await res.text();

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

      if (!data || data == "") {
        return client.say(
          channel,
          `/me ${user} doesn't stream :( but you should still go give them a follow anyways! https://www.twitch.tv/${user}`
        );
      }

      if (
        data.toLowerCase().includes("no user") ||
        data.toLowerCase() == "404 page not found"
      ) {
        return client.say(channel, "/me I couldn't find that user kellee1Cry");
      }

      setCooldown(client, this, channel, userstate);
      return client.say(
        channel,
        `/me kellee1Love Be sure to show ${user} some love and follow them at https://www.twitch.tv/${user} They were last playing ${data} kellee1Love`
      );
    } catch (e) {
      log("ERROR", "./src/commands/mod/so.ts", e.message);
      return client.say(
        channel,
        "/me Looks like an error occurred. Please try again."
      );
    }
  }
} as Command;
