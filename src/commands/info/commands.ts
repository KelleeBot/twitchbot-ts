import { Command } from "../../interfaces/Command";
import { getChannelInfo, setCooldown } from "../../utils/utils";

export default {
    name: "commands",
    category: "Info",
    canNotDisable: true,
    hideCommand: true,
    cooldown: 15,
    globalCooldown: true,
    async execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        const channelName = channel.slice(1);
        const channelInfo = await getChannelInfo(client, channelName);
        const prefix = channelInfo.prefix;
        const commands = [];

        for (const [key, value] of client.commands.entries()) {
            if (
                !value.isModOnly &&
                !value.hideCommand &&
                !client.channelInfoCache.get(channel.slice(1))!.disabledCommands.includes(key)
            ) {
                commands.push(`${prefix}${key}`);
            }
        }
        return client.say(channel, `/me ${commands.sort().join(", ")}`);
    }
} as Command;
