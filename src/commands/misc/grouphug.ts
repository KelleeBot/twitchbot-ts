import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
  name: "grouphug",
  category: "Misc",
  cooldown: 15,
  execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    return client.say(
      channel,
      `/me ${userstate["display-name"]} gives everyone a group hug! I love you ʕっ•ᴥ•ʔっ kellee1Love`
    );
  }
} as Command;
