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

        checkTwitchChat(client, userstate, message, channel);

        let channelInfo = await getChannelInfo(client, channel.slice(1));

        if (message === "kellee1Glare") {
            return client.say(
                channel,
                `kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare kellee1Glare`
            );
        }

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

        if (channelInfo.disabledCommands.includes(command.name)) return;

        const cd = getCooldown(client, command);
        let cooldowns;
        if (cd) {
            if (typeof command.globalCooldown === "undefined" || command.globalCooldown) {
                if (!client.globalCooldowns.has(command.name)) {
                    client.globalCooldowns.set(command.name, new Map<string, number>());
                }
                cooldowns = client.globalCooldowns;
            } else {
                if (!client.channelCooldowns.has(channel)) {
                    client.channelCooldowns.set(channel, new Map<string, Map<string, number>>());
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
                const expirationTime = timestamps!.get(userstate.username)! + cooldownAmount;
                if (now < expirationTime) {
                    return console.log(
                        `${command.name} on cooldown for another ${msToTime(expirationTime - now)}.`
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

const checkTwitchChat = (
    client: Client,
    userstate: Userstate,
    message: string,
    channel: string
) => {
    if (userstate.mod || isBroadcaster(userstate.username)) return;

    if (message.length > 250) {
        client
            .deletemessage(channel, userstate["id"]!)
            .then((data) => {
                client.say(
                    channel,
                    `/me ${userstate["display-name"]}, the mods here don't like reading long messages. Please try to keep it short and sweet.`
                );
            })
            .catch((e) => {
                log("ERROR", ".src/events/message.ts", e);
            });
    }

    if (
        message.toLowerCase().includes("bigfollows .com") ||
        message.toLowerCase().includes("bigfollows.com") ||
        message.toLowerCase().includes("bigfollows . com") ||
        message.includes(
            "Wanna b̔ecome̤ famoͅus̈́?̿ Bu͗y f̭ollow̮ers, primes and viewers on ̫" //https://clck.ru/R9gQV ͉(bigfollows .com)̰"
        )
    ) {
        client
            .ban(channel, userstate.username)
            .then((data) => {
                client.say(channel, `/me No, I don't wanna become famous. Good bye!`);
            })
            .catch((e) => {
                log("ERROR", ".src/events/message.js", e);
            });
    }

    if (
        message ===
        "Hey. I want to offer you a boost on twitch, a stable number of viewers, there are chat bots. I will offer a price lower than any competitor. Auto-start when stream became online.Pay only for the time when the stream is online.Pay by the hour! I'll provide a free test.The client has access to the panel to launch, and can control the process himself!For tech problems, a full refund. Telegram @Twitch_viewers Discord Twitch#3227"
    ) {
        client
            .ban(channel, userstate.username)
            .then((data) => {
                client.say(channel, `/me No, I don't want a boost on Twitch. Get outta here!`);
            })
            .catch((e) => {
                log("ERROR", ".src/events/message.js", e);
            });
    }
};
