import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { log, setCooldown, errorMessage } from "../../utils/utils";

export default {
  name: "dadjoke",
  category: "Misc",
  cooldown: 15,
  async execute({ client, channel, userstate }) {
    try {
      setCooldown(client, this, channel, userstate);
      const resp = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      const data = await resp.json();
      return client.say(channel, `/me ${data.joke}`);
    } catch (e) {
      log("ERROR", "./src/commands/misc/dadjoke.ts", e.message);
      return errorMessage(client, channel);
    }
  }
} as Command;
