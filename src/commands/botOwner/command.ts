import { Command } from "../../interfaces/Command";
import { getChannelInfo, setCooldown } from "../../utils/utils";

export default {
  name: "command",
  category: "Bot Owner",
  devOnly: true,
  hideCommand: true,
  canNotDisable: true,
  async execute({ client, channel, userstate, args }) {
    const channelName = channel.slice(1);
    let channelInfo = await getChannelInfo(client, channelName);
    const disabledCommands = channelInfo.disabledCommands;

    if (!args[0]) {
      return client.say(
        channel,
        `/me ${
          disabledCommands.length == 0
            ? "There are no disabled commands for this channel."
            : `Disabled commands for this channel: ${disabledCommands!.join(
                ", "
              )}`
        }`
      );
    }

    if (!args[1]) {
      return client.say(channel, "/me Please specify a command.");
    }

    const command = client.commands.get(args[1].toLowerCase());
    if (!command) {
      return client.say(channel, `/me Command "${args[1]}" does not exist.`);
    }

    if (command.canNotDisable) {
      return client.say(
        channel,
        `/me The command "${args[1]}" can not be disabled.`
      );
    }

    setCooldown(client, this, channel, userstate);
    switch (args[0].toLowerCase()) {
      case "disable":
        if (disabledCommands.includes(command.name)) {
          return client.say(
            channel,
            `/me The command "${command.name}" is already disabled.`
          );
        }

        await client.DBChannel.findByIdAndUpdate(
          channelName,
          { $push: { disabledCommands: command.name } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        channelInfo.disabledCommands.push(command.name);
        client.channelInfoCache.set(channelName, channelInfo);
        client.say(
          channel,
          `/me The command "${command.name}" has been disabled.`
        );
        break;
      case "enable":
        if (!disabledCommands.includes(command.name)) {
          return client.say(
            channel,
            `/me The command "${command.name}" is already enabled.`
          );
        }

        channelInfo = await client.DBChannel.findByIdAndUpdate(
          channelName,
          { $pull: { disabledCommands: command.name } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        client.channelInfoCache.set(channelName, channelInfo);
        client.say(
          channel,
          `/me The command "${command.name}" has been enabled.`
        );
        break;
      default:
        client.say(channel, '/me Please specify either "enable" or "disable".');
        break;
    }
    return;
  }
} as Command;
