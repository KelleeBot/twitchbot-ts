![KelleeBot](https://cdn.discordapp.com/attachments/678118132027621385/837418896167272489/image0_4.jpg)

# KelleeBot - Twitch

This is a multi-purpose Twitch moderation chat bot written in Node.js and TypeScript. It connects to a MongoDB database that allows for storing of per-channel data (i.e., channel command prefixes).

It has a built-in feature that is able to auto-detect bot accounts and immediately bans these accounts from the channel. It also makes various API calls. For example, making an API call that will make the bot tell a random dad joke in chat.

**Note:** This is a re-write of the [original version](https://github.com/alima566/twitch-bot). I consider the orginal version to be archived and will no longer be maintained. The original version was purely written in JavaScript, while this one is written in TypeScript. This one also includes some additional features that the previous version didn't (i.e., being able to disable a command by just typing a command in chat).
