import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { setCooldown, log, errorMessage } from "../../utils/utils";

export default {
  name: "uptime",
  category: "Info",
  cooldown: 15,
  globalCooldown: true,
  async execute({ client, channel, userstate }) {
    try {
      setCooldown(client, this, channel, userstate);
      const resp = await fetch(
        `https://beta.decapi.me/twitch/uptime/${encodeURIComponent(
          channel.slice(1)
        )}`
      );
      const data = await resp.text();
      if (data.toLowerCase().includes("offline")) {
        return client.say(channel, `/me ${data}`);
      }

      return client.say(
        channel,
        `/me ${channel.slice(1)} has been live for ${data}.`
      );
    } catch (e) {
      log("ERROR", "./src/commands/info/uptime.ts", e.message);
      return errorMessage(client, channel);
    }
  }
} as Command;
