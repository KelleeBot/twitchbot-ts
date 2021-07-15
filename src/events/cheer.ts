import { Client } from "../Client";
import { Userstate } from "tmi.js";
import { formatNumber } from "../utils/utils";

export default async (client: Client, channel: string, userstate: Userstate, _message: string) => {
    const numBits = formatNumber(userstate.bits);
    return client.say(
        channel,
        `/me Thank you @${userstate["display-name"]} for the ${numBits} bit${
            userstate.bits != 1 ? "s" : ""
        }!`
    );
};
