import { Client } from "../Client";

export default (
  client: Client,
  channel: string,
  username: string,
  viewers: number,
  _autohost: boolean
) => {
  return client.say(
    channel,
    `/me Thank you @${username} for hosting the stream with  ${viewers} viewer${
      viewers != 1 ? "s" : ""
    }! kellee1Love`
  );
};
