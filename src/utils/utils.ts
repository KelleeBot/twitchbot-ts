import { Userstate } from "tmi.js";
import { Client } from "../Client";
import { Command } from "../interfaces/Command";
import { Arguments } from "../types/Arguments";
import { Flags } from "../types/Flags";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";
import axios from "axios";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

const consoleColors = {
    SUCCESS: "\u001b[32m",
    WARNING: "\u001b[33m",
    INFO: "\u001b[33m",
    ERROR: "\u001b[31m"
};

const hasAmount = ["STRING", "NUMBER"];

const processArguments = (message: string, msgArgs: string[], expectedArgs: Arguments) => {
    let counter = 0;
    let amount, num;
    let flags: Flags = {};

    for (const argument of expectedArgs) {
        if (hasAmount.includes(argument.type)) {
            amount = argument.amount && argument.amount > 1 ? argument.amount : 1;
        } else {
            amount = 1;
        }

        for (let i = 0; i < amount; i++) {
            switch (argument.type) {
                case "STRING":
                    if (!msgArgs[counter]) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (
                        argument.words &&
                        !argument.words.includes(msgArgs[counter].toLowerCase())
                    ) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (argument.regexp && !argument.regexp.test(msgArgs[counter])) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (amount == 1) {
                        flags[argument.id] = msgArgs[counter];
                    } else if (flags[argument.id]) {
                        //@ts-ignore
                        flags[argument.id].push(msgArgs[counter]);
                    } else {
                        flags[argument.id] = [msgArgs[counter]];
                    }
                    break;

                case "NUMBER":
                    num = Number(msgArgs[counter]);
                    if (!msgArgs[counter] || isNaN(num)) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (argument.min && argument.min > num) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (argument.max && argument.max < num) {
                        return { invalid: true, prompt: argument.prompt };
                    }

                    if (argument.toInteger) {
                        //@ts-ignore
                        num = parseInt(num);
                    }

                    if (amount == 1) {
                        flags[argument.id] = num;
                    } else if (flags[argument.id]) {
                        //@ts-ignore
                        flags[argument.id].push(num);
                    } else {
                        flags[argument.id] = [num];
                    }
                    break;
                default:
                    console.warn(
                        //@ts-ignore
                        `processArguments: the argument type "${argument.type}" doesn't exist.`
                    );
            }
            counter++;
        }
    }
    return flags;
};

export const getAllFamousLinks = async (client: Client) => {
    if (client.famousCache.length) return client.famousCache;
    const results = (await client.DBFamousLinks.find({})) as any;
    for (const result of results) {
        for (const famous of result.famous) {
            client.famousCache.push(famous);
        }
    }
    return client.famousCache;
};

const getChannelInfo = async (client: Client, channel: string) => {
    let channelInfo = client.channelInfoCache.get(channel);
    if (!channelInfo) {
        channelInfo = await client.DBChannel.findByIdAndUpdate(
            channel,
            {},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        client.channelInfoCache.set(channel, channelInfo);
    }
    return channelInfo;
};

export const getUserInfo = async (client: Client, userID: string) => {
    let userInfo = client.userInfoCache.get(userID.toLowerCase());
    if (!userInfo) {
        userInfo = await client.DBUser.findByIdAndUpdate(
            userID.toLowerCase(),
            {},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        client.userInfoCache.set(userID, userInfo);
    }
    return userInfo;
};

const getCooldown = (client: Client, command: Command) => {
    return command.cooldown;
};

const setCooldown = (client: Client, command: Command, channel: string, userstate: Userstate) => {
    const cd = getCooldown(client, command);
    if (!cd) return;

    let cooldowns;
    if (typeof command.globalCooldown === "undefined" || command.globalCooldown) {
        if (!client.globalCooldowns.has(command.name)) {
            client.globalCooldowns.set(command.name, new Map());
        }
        cooldowns = client.globalCooldowns;
    } else {
        if (!client.channelCooldowns.has(channel)) {
            client.channelCooldowns.set(channel, new Map());
            cooldowns = client.channelCooldowns.get(channel);
        }
        if (!client.channelCooldowns.has(channel)) {
            client.channelCooldowns.set(channel, new Map());
        }
        cooldowns = client.channelCooldowns.get(channel);
        if (!cooldowns!.has(command.name)) {
            cooldowns!.set(command.name, new Map());
        }
    }

    const now = Date.now();
    const timestamps = cooldowns!.get(command.name);
    const cooldownAmount = cd * 1000;
    timestamps!.set(userstate.username, now);
    setTimeout(() => timestamps!.delete(userstate.username), cooldownAmount);
};

const isBroadcaster = (user: string) => {
    return user.toLowerCase() === `${process.env.CHANNEL_NAME}`.toLowerCase();
};

const log = (type: "SUCCESS" | "ERROR" | "WARNING" | "INFO", path: string, text: string) => {
    const timestamp = dayjs().tz("America/Denver").format("MM-DD-YYYY HH:mm:ss");
    console.log(
        `\u001b[36;1m<${timestamp}>\u001b[0m\u001b[34m [${path}]\u001b[0m - ${consoleColors[type]}${text}\u001b[0m`
    );
};

const msToTime = (ms: number) => {
    let time = "";

    let n = 0;
    if (ms >= 31536000000) {
        n = Math.floor(ms / 31536000000);
        time = `${n}y `;
        ms -= n * 31536000000;
    }

    if (ms >= 2592000000) {
        n = Math.floor(ms / 2592000000);
        time += `${n}mo `;
        ms -= n * 2592000000;
    }

    if (ms >= 604800000) {
        n = Math.floor(ms / 604800000);
        time += `${n}w `;
        ms -= n * 604800000;
    }

    if (ms >= 86400000) {
        n = Math.floor(ms / 86400000);
        time += `${n}d `;
        ms -= n * 86400000;
    }

    if (ms >= 3600000) {
        n = Math.floor(ms / 3600000);
        time += `${n}h `;
        ms -= n * 3600000;
    }

    if (ms >= 60000) {
        n = Math.floor(ms / 60000);
        time += `${n}m `;
        ms -= n * 60000;
    }

    n = Math.ceil(ms / 1000);
    time += n === 0 ? "" : `${n}s`;

    return time.trimEnd();
};

const replaceChars = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_'""`~()]/g, "")
        .replace(/\s{2,}/g, " ");
};

const errorMessage = (client: Client, channel: string) => {
    client.say(channel, "/me An error has occurred. Please try again.");
};

const randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const getCurrentGame = (channel: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await axios.get(`https://beta.decapi.me/twitch/game/${channel}`);
            if (resp) resolve(resp.data);
            else reject("There was a problem retrieving game data.");
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred : ${e}`);
        }
    });
};

export {
    processArguments,
    getChannelInfo,
    getCooldown,
    setCooldown,
    isBroadcaster,
    log,
    msToTime,
    replaceChars,
    errorMessage,
    randomRange,
    formatNumber,
    getCurrentGame
};
