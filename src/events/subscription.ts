import { Userstate } from "tmi.js";
import { Client } from "../Client";

export default (
    client: Client,
    channel: string,
    username: string,
    methods: any,
    userstate: Userstate
) => {
    return client.say(channel, `/me Thank you @${username} for subscribing! kellee1Love`);
};
