import { Command } from "../../interfaces/Command";
import { randomRange, setCooldown } from "../../utils/utils";

const replies = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes, definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Very doubtful."
];

export default {
  name: "8ball",
  category: "Misc",
  cooldown: 15,
  arguments: [
    {
      type: "STRING",
      prompt: "Please ask me a question first."
    }
  ],
  execute({ client, channel, userstate }) {
    setCooldown(client, this, channel, userstate);
    const index = randomRange(0, replies.length - 1);
    const response = replies[index];
    return client.say(channel, `/me ${response}`);
  }
} as Command;
