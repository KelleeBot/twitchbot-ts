import { Command } from "../../interfaces/Command";

export default {
  name: "discord",
  isModOnly: true,
  execute({ client, channel }) {
    return client.say(
      channel,
      "/me Come join the Lunar Circle! https://discord.gg/M8fxKXq"
    );
  }
} as Command;
