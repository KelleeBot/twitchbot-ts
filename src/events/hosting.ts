import { Client } from "../Client";

export default (
  client: Client,
  channel: string,
  target: string,
  viewers: number
) => {
  return client.say(
    channel,
    `/me We are now hosting ${target} with ${viewers} viewer${
      viewers != 1 ? "s" : ""
    }!`
  );
};
