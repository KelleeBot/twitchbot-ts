import { Client } from "../Client";

let cdStarted: any = {};

const countdown = (client: Client, channel: string, seconds: number) => {
  const interval = setInterval(() => {
    if (seconds == 0) {
      client.say(channel, "/me Go!");
      client.say(channel, "/color HotPink");
      clearTimeout(interval);
      cdStarted[channel] = false;
    }

    if (seconds % 10 == 0 && seconds != 0) {
      client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
    }

    if (seconds == 6) {
      client.say(channel, "/me Ready kellee1Glare");
    }

    if (seconds < 6 && seconds > 0) {
      client.say(channel, `/me ${seconds}`);
    }
    seconds--;
  }, 1000);
};

const countdownTeams = (
  client: Client,
  channel: string,
  seconds: number,
  color: string
) => {
  switch (color) {
    case "r":
      client.color("FireBrick");
      client.say(channel, "/me Team Battle: Red Team");
      break;
    case "y":
      client.color("GoldenRod");
      client.say(channel, "/me Team Battle: Yellow Team");
      break;
    case "b":
      client.color("DodgerBlue");
      client.say(channel, "/me Team Battle: Blue Team");
      break;
    case "g":
      client.color("SpringGreen");
      client.say(channel, "/me Team Battle: Green Team");
      break;
    default:
      return client.say(channel, "/me Invalid team color.");
  }

  if (+seconds % 10 != 0) {
    client.say(channel, `/me Countdown happening in ${seconds} seconds...`);
  }
  return countdown(client, channel, seconds);
};

const started = (channel: string) => {
  return cdStarted[channel];
};

const startCountdown = (channel: string) => {
  cdStarted[channel] = true;
};

export { countdown, countdownTeams, startCountdown, started };
