import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

export default {
    name: "time",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        const time = dayjs().tz("America/New_York").format("DD/MM/YYYY h:mm:ss A z");
        return client.say(channel, `/me Kéllee's current time is ${time}.`);
    }
} as Command;
