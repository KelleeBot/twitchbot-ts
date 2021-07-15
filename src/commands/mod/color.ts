import { Command } from "../../interfaces/Command";
import { log } from "../../utils/utils";

export default {
  name: "color",
  aliases: ["setcolor"],
  category: "Mod",
  isModOnly: true,
  arguments: [
    {
      type: "STRING",
      prompt: "Please specify a color to change my color to.",
      amount: 1
    }
  ],
  async execute({ client, channel, args }) {
    try {
      const color = await client.color(args[0]);
      return client.say(channel, `/me My color has been changed to ${color}.`);
    } catch (e) {
      log("ERROR", "./src/commands/mod/color.ts", e);
      return client.say(
        channel,
        "/me Color must be in one of the following: Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen."
      );
    }
  }
} as Command;
