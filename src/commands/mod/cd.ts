import { Command } from "../../interfaces/Command";
import {
  countdown,
  countdownTeams,
  startCountdown,
  started
} from "../../utils/countdown";

const teamColors = ["r", "y", "b", "g"];

export default {
  name: "cd",
  aliases: ["countdown"],
  category: "Mod",
  isModOnly: true,
  arguments: [
    {
      type: "NUMBER"
    }
  ],
  execute({ client, channel, args }) {
    if (started(channel)) {
      return client.say(
        channel,
        "/me I can only do one countdown at a time kellee1Glare"
      );
    }

    if (!args[0]) {
      startCountdown(channel);
      return countdown(client, channel, 6);
    }

    const splitString = args[0].split(/(\d+)/); // Split string by number
    const seconds = splitString[1];
    const color = splitString[2] ? splitString[2].toLowerCase() : "";

    if (isNaN(+seconds) || !Number.isInteger(+seconds)) return;

    if (+seconds > 99) {
      return client.say(
        channel,
        "/me Countdown can't be longer than 99 seconds."
      );
    }

    if (!color) {
      startCountdown(channel);
      if (+seconds % 10 != 0) {
        client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
      }
      return countdown(client, channel, +seconds);
    }

    if (!teamColors.includes(color))
      return client.say(channel, "/me Invalid team color.");

    startCountdown(channel);
    return countdownTeams(client, channel, +seconds, color);
  }
} as Command;
