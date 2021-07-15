import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
  name: "bean",
  category: "AC",
  cooldown: 15,
  globalCooldown: true,
  execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    return client.say(
      channel,
      "/me Bean's custom designs: https://docs.google.com/document/d/1wBXPd7_KiKB-yZ_CLnI6WOMemdsFC4VGvdQBDtkLNSE/edit"
    );
  }
} as Command;
