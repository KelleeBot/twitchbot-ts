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
        const { prefix } = channelInfo;
        const commands = new Set();

        for (const [key, value] of client.commands.entries()) {
            if (
                !value.isModOnly &&
                !value.hideCommand &&
                !value.devOnly &&
                !client.channelInfoCache.get(channel.slice(1))!.disabledCommands.includes(key)
            ) {
                commands.add(`${prefix}${value.name}`);
            }
        }
        return client.say(channel, `/me ${Array.from(commands).sort().join(", ")}`);
    }
} as Command;
