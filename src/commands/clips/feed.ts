import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
  name: "feed",
  category: "Clips",
  cooldown: 15,
  globalCooldown: true,
  execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    return client.say(
      channel,
      "/me Feed ur animals SCRUB https://www.twitch.tv/kelleelu/clip/CrispyBreakableWolverineSeemsGood"
    );
  }
} as Command;
