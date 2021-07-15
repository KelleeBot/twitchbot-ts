import {
  getChannelInfo,
  getCooldown,
  isBroadcaster,
  log,
  msToTime,
  processArguments
} from "../utils/utils";
import { devs } from "../config/config.json";
import { Client } from "../Client";
import { Userstate } from "tmi.js";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async (
  client: Client,
  channel: string,
  userstate: Userstate,
  message: string,
  self: boolean
) => {
  try {
    if (self || userstate.bot) return;

    let channelInfo = await getChannelInfo(client, channel);

    // if (message.toLowerCase() === `@${process.env.BOT_USERNAME}`) {
    //   return client.say(
    //     channel,
    //     `/me My prefix for this channel is "${channelInfo.prefix}".`
    //   );
    // }

    const prefixRegex = new RegExp(
      `^(@${process.env.BOT_USERNAME}|${escapeRegex(channelInfo.prefix)})`
    );
    if (!prefixRegex.test(message)) return;

    //@ts-ignore
    const [, matchedPrefix] = message.match(prefixRegex);
    let msgArgs = message.slice(matchedPrefix.length).trim().split(/ +/);
    let cmdName = msgArgs.shift()!.toLowerCase();

    const command =
      client.commands.get(cmdName) ||
      (channelInfo.commandAlias
        ? client.commands.get(channelInfo.commandAlias[cmdName])
        : false);
    if (!command) return;

    if (
      !userstate.mod &&
      !isBroadcaster(userstate.username) &&
      command.isModOnly &&
      !devs.includes(userstate.username)
    )
      return;

    if (command.devOnly && !devs.includes(userstate.username)) return;

    const cd = getCooldown(client, command);
    let cooldowns;
    if (cd) {
      if (
        typeof command.globalCooldown === "undefined" ||
        command.globalCooldown
      ) {
        if (!client.globalCooldowns.has(command.name)) {
          client.globalCooldowns.set(command.name, new Map<string, number>());
        }
        cooldowns = client.globalCooldowns;
      } else {
        if (!client.channelCooldowns.has(channel)) {
          client.channelCooldowns.set(
            channel,
            new Map<string, Map<string, number>>()
          );
        }
        cooldowns = client.channelCooldowns.get(channel);
        if (!cooldowns!.has(command.name)) {
          cooldowns!.set(command.name, new Map<string, number>());
        }
      }

      const now = Date.now();
      const timestamps = cooldowns!.get(command.name);
      const cooldownAmount = cd * 1000;
      if (timestamps!.has(userstate.username)) {
        const expirationTime =
          timestamps!.get(userstate.username)! + cooldownAmount;
        if (now < expirationTime) {
          return console.log(
            `${command.name} on cooldown for another ${msToTime(
              expirationTime - now
            )}.`
          );
        }
      }
    }

    let flags;
    if (command.arguments) {
      flags = processArguments(message, msgArgs, command.arguments);
    }
    if (flags && flags.invalid) {
      if (flags.prompt) {
        return client.say(channel, `/me ${flags.prompt}`);
      }
    }

    return command.execute({
      client,
      userstate,
      channel,
      message,
      args: msgArgs,
      //@ts-ignore
      flags
    });
  } catch (e) {
    console.log(e);
  }
};
