import { Command } from "../../interfaces/Command";
import { setCooldown, log } from "../../utils/utils";
import fetch from "node-fetch";

export default {
  name: "blind",
  category: "Misc",
  cooldown: 15,
  globalCooldown: true,
  async execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    const game = await getGame(channel);
    return client.say(
      channel,
      `/me Kéllee is doing a blind playthrough of ${game}! We ask that you PLEASE don't give Kéllee any hints, tips, tricks, or spoilers whatsoever unless asked and let her figure stuff out on her own! Thank you!`
    );
  }
} as Command;

const getGame = (channel: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await fetch(
        `https://beta.decapi.me/twitch/game/${channel.slice(1).toLowerCase()}`
      );
      const result = await body.text();
      if (result) {
        resolve(result);
      } else {
        reject("There was a problem retrieving game data.");
      }
    } catch (e) {
      log("ERROR", "./command/misc/blind.js", e.message);
    }
  });
};
