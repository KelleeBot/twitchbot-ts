import cron from "cron";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Client } from "../../Client";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);

export default (client: Client) => {
	new cron.CronJob("00 */15 20-23 * * *", () => execute(client), null, true, "America/Denver");
};

const execute = async (client: Client) => {
	client.say("#kellee", `/me ${getTimeRemaingText()}`);
};

const getTimeRemaingText = () => {
	const nowEST = dayjs().tz("America/Toronto");
	const midnightEST = dayjs("2023-09-01 22:00:00").tz("America/Toronto");

	const remaining = dayjs.duration(midnightEST.diff(nowEST));
	const hours = remaining.get("hours");
	const minutes = remaining.get("minutes");
	const seconds = remaining.get("seconds");

	const hoursText = hours !== 1 ? "hours" : "hour";
	const minutesText = minutes !== 1 ? "minutes" : "minute";
	const secondsText = seconds !== 1 ? "seconds" : "second";

	console.log("hours", hours);
	console.log("mins", minutes);
	console.log("secs", seconds);

	if (hours <= 0 && minutes <= 0 && seconds <= 0) return "IT'S KÉLLEE'S BIRTHDAY!!!! EVERYBODY WISH HER A HAPPY BIRTHDAY!!!!";
	if (hours === 0 && minutes === 0) return `Only ${seconds} ${secondsText} until Kéllee's birthday!!!`;
	if (hours === 0) return `Only ${minutes} ${minutesText} and ${seconds} ${secondsText} until Kéllee's birthday!!!`;

	return `Only ${hours} ${hoursText}, ${minutes} ${minutesText} and ${seconds} ${secondsText} until Kéllee's birthday!!!`;
};
