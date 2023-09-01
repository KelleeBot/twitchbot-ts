import { Command } from "../../interfaces/Command";
import { setCooldown } from "../../utils/utils";

export default {
	name: "subathon",
	category: "Misc",
	cooldown: 15,
	execute({ client, channel, userstate }) {
		setCooldown(client, this, channel, userstate);
		client.say(channel, "/me Subathon Goals");
		client.say(channel, "/me 10 subs - Stitch Voice Redemption");
		client.say(channel, "/me 25 subs - Game Community Voted");
		client.say(channel, "/me 35 subs - Scary Game Community Voted");
		client.say(channel, "/me 50 subs - Halloween Emotes");
		client.say(channel, "/me 100 subs - Flute Solo");
	},
} as Command;
