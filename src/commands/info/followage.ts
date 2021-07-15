import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import {
  errorMessage,
  log,
  replaceChars,
  setCooldown
} from "../../utils/utils";

export default {
  name: "followage",
  category: "Info",
  cooldown: 15,
  async execute({ client, channel, userstate }) {
    try {
      setCooldown(client, this, channel, userstate);
      const resp = await fetch(
        `https://beta.decapi.me/twitch/followage/${process.env.CHANNEL_NAME}/${userstate.username}?precision=7`
      );
      const data = await resp.text();
      if (replaceChars(data) == "a user cannot follow themself") {
        return client.say(channel, `/me ${data}`);
      }

      return client.say(
        channel,
        `/me ${userstate["display-name"]} has been following ${process.env.CHANNEL_NAME} for ${data}.`
      );
    } catch (e) {
      log("ERROR", ".src/commands/info/followage.ts", e.message);
      return errorMessage(client, channel);
    }
  }
} as Command;
