import { Command } from "../../interfaces/Command";
import { getChannelInfo, setCooldown } from "../../utils/utils";

export default {
  name: "commands",
  category: "Info",
  hideCommand: true,
  cooldown: 15,
  globalCooldown: true,
  async execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    const channelInfo = await getChannelInfo(client, channel);
    const prefix = channelInfo.prefix;
    const commands = [];

    for (const [key, value] of client.commands.entries()) {
      if (!value.isModOnly && !value.hideCommand) {
        commands.push(`${prefix}${key}`);
      }
    }
    return client.say(channel, `/me ${commands.sort().join(", ")}`);
  }
} as Command;
