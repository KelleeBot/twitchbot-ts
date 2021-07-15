import { Userstate } from "tmi.js";
import { Client } from "../Client";

export default (
  client: Client,
  channel: string,
  username: string,
  _sender: number,
  userstate: Userstate
) => {
  return client.say(
    channel,
    `/me Thank you @${username} for continuing your gifted sub from ${userstate["msg-param-sender-name"]}!`
  );
};
