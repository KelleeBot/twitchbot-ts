import { Command } from "../../interfaces/Command";
import { getChannelInfo, setCooldown } from "../../utils/utils";

const prefixRegExp = /^[a-zA-Z0-9!@#\$%\^\&*\)\(\?+=_-]{1,15}$/;

export default {
  name: "prefix",
  aliases: ["setprefix"],
  category: "Mod",
  cooldown: 30,
  globalCooldown: true,
  isModOnly: true,
  arguments: [
    {
      type: "STRING",
      prompt: "Please enter a new prefix."
    }
  ],
  async execute({ client, channel, args, userstate }) {
    const channelName = channel.slice(1);
    if (!prefixRegExp.test(args[0])) {
      return client.say(
        channel,
        "/me That command prefix is not allowed. Please try again."
      );
    }

    const channelInfo = await getChannelInfo(client, channelName);
    if (channelInfo.prefix == args[0]) {
      return client.say(channel, "/me Please make sure to enter a new prefix.");
    }

    setCooldown(client, this, channel, userstate);
    await client.DBChannel.findByIdAndUpdate(
      channelName,
      {
        $set: {
          prefix: args[0]
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    channelInfo.prefix = args[0];
    client.channelInfoCache.set(channel.slice(1), channelInfo);
    return client.say(
      channel,
      `/me Channel prefix has been successfully set to "${args[0]}".`
    );
  }
} as Command;
