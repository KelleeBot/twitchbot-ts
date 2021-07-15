import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import { log, setCooldown } from "../../utils/utils";

export default {
  name: "dadadvice",
  category: "Misc",
  cooldown: 15,
  async execute({ client, channel, userstate }) {
    try {
      setCooldown(client, this, channel, userstate);
      const resp = await fetch(`https://api.adviceslip.com/advice`);
      const data = await resp.json();
      return client.say(channel, `/me ${data["slip"]["advice"]}`);
    } catch (e) {
      log("ERROR", "./src/commands/misc/dadadvice.ts", e.message);
      return client.say(channel, "An error has occurred. Please try again.");
    }
  }
} as Command;
