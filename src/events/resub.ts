import { Userstate } from "tmi.js";
import { Client } from "../Client";

export default (
  client: Client,
  channel: string,
  username: string,
  streakMonths: number,
  message: string,
  userstate: Userstate,
  methods: any
) => {
  const cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
  const shareStreak = userstate["msg-param-should-share-streak"];
  return client.say(
    channel,
    `/me Thank you @${username} for the ${cumulativeMonths} month${
      cumulativeMonths != 1 ? "s" : ""
    } sub! ${
      shareStreak
        ? `They are now on a ${streakMonths} month${
            streakMonths != 1 ? "s" : ""
          } streak!`
        : ""
    }PrideRise`
  );
};
