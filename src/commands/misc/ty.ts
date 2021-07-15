import { Command } from "../../interfaces/Command";
import { randomRange, setCooldown } from "../../utils/utils";
import { COMPLIMENTS } from "../../config/compliments.json";

export default {
  name: "ty",
  category: "misc",
  cooldown: 15,
  execute({ client, channel, args, userstate }) {
    setCooldown(client, this, channel, userstate);
    const index = randomRange(0, COMPLIMENTS.length - 1);

    if (!args.length) {
      const content = COMPLIMENTS[index].replace(
        /<user>/g,
        userstate["display-name"]!
      );
      return client.say(channel, `/me ${content} KPOPheart`);
    }

    const user = args[0].startsWith("@")
      ? args[0].replace(/@/g, "").trim()
      : args[0].trim();
    if (user.toLowerCase() === `${process.env.BOT_USERNAME}`.toLowerCase()) {
      return client.say(
        channel,
        "/me You better thank me. It's a lot of work being a bot on here."
      );
    }

    const content = COMPLIMENTS[index].replace("<user>", user);
    return client.say(channel, `/me ${content} KPOPheart`);
  }
} as Command;
