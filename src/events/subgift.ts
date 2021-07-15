import { Userstate } from "tmi.js";
import { Client } from "../Client";

export default (
    client: Client,
    channel: string,
    username: string,
    streakMonths: number,
    recipient: string,
    methods: any,
    userstate: Userstate
) => {
    if (
        userstate["msg-param-recipient-display-name"].toLowerCase() ===
        `${process.env.BOT_USERNAME}`.toLowerCase()
    ) {
        return client.say(
            channel,
            `/me Thank you @${username} for gifting a sub to me. I really appreciate it. kellee1Love`
        );
    }

    return client.say(
        channel,
        `/me Thank you @${username} for gifting a sub to ${userstate["msg-param-recipient-display-name"]}! PrideRise`
    );
};
