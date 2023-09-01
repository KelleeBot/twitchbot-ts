import { Dirent, promises as fsPromises } from "fs";
import path from "path";
import { Events } from "tmi.js";

import { Client } from "../Client";
import { Command } from "../interfaces/Command";

async function registerCommands(client: Client, ...dirs: string[]) {
	for (const dir of dirs) {
		const files = await fsPromises.readdir(path.join(__dirname, dir));
		for (let file of files) {
			const stat = await fsPromises.lstat(path.join(__dirname, dir, file));
			if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
			else {
				if (file.endsWith(".ts") || file.endsWith(".js")) {
					try {
						const cmdModule: Command = (await import(path.join(__dirname, dir, file))).default;
						const { name, aliases, category, execute, hideCommand } = cmdModule;

						if (!name) {
							console.warn(`The command "${path.join(__dirname, dir, file)}" doesn't have a name.`);
							continue;
						}

						if (!execute) {
							console.warn(`The command "${name}" doesn't have an execute function.`);
							continue;
						}

						if (client.commands.has(name)) {
							console.warn(`The command name "${name}" has already been added.`);
							continue;
						}

						client.commands.set(name, cmdModule);

						if (aliases && aliases.length !== 0) {
							aliases.forEach((alias: string) => {
								if (client.commands.has(alias)) {
									console.warn(`The command "${alias}" has already been added.`);
								} else {
									client.commands.set(alias, cmdModule);
								}
							});
						}

						if (hideCommand) continue;

						if (category) {
							let commands = client.categories.get(category.toLowerCase());
							if (!commands) commands = [category];
							commands.push(name);
							client.categories.set(category.toLowerCase(), commands);
						} else {
							console.warn(`The command "${name}" doesn't have a category. It will default to "No Category".`);
							let commands = client.categories.get("No Category");
							if (!commands) commands = ["No Category"];
							commands.push(name);
							client.categories.set("No Category", commands);
						}
					} catch (e) {
						console.error(`Error loading commands: ${e}`);
					}
				}
			}
		}
	}
}

async function registerEvents(client: Client, dir: string) {
	const files = await fsPromises.readdir(path.join(__dirname, dir));
	for (let file of files) {
		const stat = await fsPromises.lstat(path.join(__dirname, dir, file));
		if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
		else {
			if (file.endsWith(".ts") || file.endsWith(".js")) {
				let eventName = file.substring(0, file.length - 3);
				try {
					let eventModule = (await import(path.join(__dirname, dir, file))).default;
					client.on(eventName as keyof Events, eventModule.bind(null, client));
				} catch (e) {
					console.error(`Error loading events: ${e}`);
				}
			}
		}
	}
}

export const registerFeatures = async (client: Client, dir: string) => {
	for (const [file, fileName] of await getAllFiles(path.join(__dirname, dir))) {
		registerFeature(client, await import(file), fileName);
	}
};

const registerFeature = (client: Client, file: any, _fileName: string) => {
	const { default: func, config } = file;
	if (typeof func !== "function") return;
	func(client);
};

const getAllFiles = async (dir: string) => {
	const files: Dirent[] = await fsPromises.readdir(dir, { withFileTypes: true });
	let jsFiles: [string, string][] = [];

	for (const file of files) {
		if (file.isDirectory()) {
			jsFiles = [...jsFiles, ...(await getAllFiles(`${dir}/${file.name}`))];
		} else if (file.name.endsWith(".js")) {
			let fileName: string | string[] = file.name.replace(/\\/g, "/").split("/");
			fileName = fileName[fileName.length - 1];
			fileName = fileName.split(".")[0].toLowerCase();
			jsFiles.push([`${dir}/${file.name}`, fileName]);
		}
	}
	return jsFiles;
};

export { registerCommands, registerEvents };
