import { Client } from "../Client";
import fetch from "node-fetch";
import { log } from "../utils/utils";

export default async (client: Client, channel: string, username: string, viewers: number) => {
    client.say(
        channel,
        `/me Incoming raid! PrideRise Thank you @${username} for raiding the channel with ${viewers} viewer${viewers !== 1 ? "s" : ""
        }! Welcome raiders!`
    );
    const game = await gamePlayed(username);

    setTimeout(() => {
        return client.say(
            channel,
            `/me kellee1Love Be sure to show ${username} some love and follow them at https://www.twitch.tv/${username.toLowerCase()} They were last playing ${game} kellee1Love`
        )
    }, 5_000);
};

const gamePlayed = async (username: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await fetch(
                `https://beta.decapi.me/twitch/game/${username.toLowerCase()}`
            );
            const data = await resp.text();
            resolve(data);
        } catch (e) {
            log("ERROR", `${__filename}`, `An error has occurred: ${e}`);
            reject(e);
        }
    });
};
