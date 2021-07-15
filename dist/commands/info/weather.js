"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const weather_js_1 = __importDefault(require("weather-js"));
const convert_1 = __importDefault(require("convert"));
exports.default = {
    name: "weather",
    category: "Info",
    cooldown: 15,
    globalCooldown: true,
    execute({ client, channel, userstate }) {
        utils_1.setCooldown(client, this, channel, userstate);
        weather_js_1.default.find({ search: "New York City, NY", degreeType: "C" }, (err, result) => {
            if (err) {
                utils_1.log("ERROR", "./src/commands/info/weather.ts", err);
                return utils_1.errorMessage(client, channel);
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
        });
    }
};
const convertToFahrenheit = (temp) => {
    return convert_1.default(temp, "C").to("F").toFixed(1);
};
const convertToMiles = (windspeed) => {
    return convert_1.default(windspeed, "kilometers").to("miles").toFixed(1);
};
