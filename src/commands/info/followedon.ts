import { Command } from "../../interfaces/Command";
import fetch from "node-fetch";
import {
  errorMessage,
  log,
  replaceChars,
  setCooldown
} from "../../utils/utils";

export default {
  name: "followedon",
  category: "Info",
  cooldown: 15,
  async execute({ client, channel, userstate }) {
    try {
      setCooldown(client, this, channel, userstate);
      const resp = await fetch(
        `https://beta.decapi.me/twitch/followed/${process.env.CHANNEL_NAME}/${
          userstate.username
        }?tz=America/New_York&format=${encodeURIComponent("d/m/Y g:i:s A T")}`
      );
      const data = await resp.text();
      if (replaceChars(data) == "a user cannot follow themself") {
        return client.say(channel, `/me ${data}`);
      }

      return client.say(
        channel,
        `/me ${userstate["display-name"]} followed ${process.env.CHANNEL_NAME} on ${data}.`
      );
    } catch (e) {
      log("ERROR", ".src/commands/info/followedon.ts", e.message);
      return errorMessage(client, channel);
    }
  }
} as Command;
