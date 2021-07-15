import fetch from "node-fetch";
import { Command } from "../../interfaces/Command";
import { log, setCooldown } from "../../utils/utils";

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
    setCooldown(client, this, channel, userstate);
    let query = args.join(" ").trim();
    if (query.includes(" ")) {
      query = query.replace(/ +/g, "_");
    }

    if (query.toLowerCase() === "etoile") {
      query = "Étoile";
    }

    try {
      const resp = await fetch(
        `https://api.nookipedia.com/villagers?name=${encodeURIComponent(
          query.toLowerCase()
        )}&nhdetails=true`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": `${process.env.NOOK_API_KEY}`,
            "Accept-Version": "2.0.0"
          }
        }
      );

      const data = await resp.json();
      if (!data)
        return client.say(
          channel,
          "/me I could not find a villager with that name."
        );

      const { name, personality, species, phrase, url } = data[0];
      return client.say(
        channel,
        `/me ${name} is a ${personality.toLowerCase()} ${species.toLowerCase()}, ${phrase}! More info: ${url}`
      );
    } catch (e) {
      log("ERROR", "./src/commands/AC/villager.ts", e.message);
      return client.say(
        channel,
        "/me I could not find a villager with that name."
      );
    }
  }
} as Command;
