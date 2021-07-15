import { Command } from "../../interfaces/Command";
import { log, setCooldown, errorMessage } from "../../utils/utils";
import weather from "weather-js";
import convert from "convert";

export default {
    name: "weather",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        setCooldown(client, this, channel, userstate);
        weather.find(
            { search: "New York City, NY", degreeType: "C" },
            (err: string, result: any) => {
                if (err) {
                    log("ERROR", "./src/commands/info/weather.ts", err);
                    return errorMessage(client, channel);
                }

                if (!result || !result[0]) {
                    return client.say(channel, "/me No results found.");
                }

                const { location, current } = result[0];
                const { winddisplay, temperature, windspeed, humidity } = current;
                const fahrenheit = convertToFahrenheit(temperature);
                const miles = convertToMiles(windspeed.split(" ")[0]);
                const direction = winddisplay.split(" ").splice(-1)[0];
                const text = `Weather for ${location.name}: ${current.skytext} with a temperature of ${current.temperature}°C (${fahrenheit}°F). Wind is blowing from the ${direction} at ${windspeed} (${miles} m/h) and the humidity is ${humidity}%.`;

                return client.say(channel, `/me ${text}`);
            }
        );
    }
} as Command;

const convertToFahrenheit = (temp: number) => {
    return convert(temp, "C").to("F").toFixed(1);
};

const convertToMiles = (windspeed: number) => {
    return convert(windspeed, "kilometers").to("miles").toFixed(1);
};
