"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = exports.registerCommands = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function registerCommands(client, ...dirs) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const dir of dirs) {
            const files = yield fs_1.default.promises.readdir(path_1.default.join(__dirname, dir));
            for (let file of files) {
                const stat = yield fs_1.default.promises.lstat(path_1.default.join(__dirname, dir, file));
                if (stat.isDirectory())
                    registerCommands(client, path_1.default.join(dir, file));
                else {
                    if (file.endsWith(".ts") || file.endsWith(".js")) {
                        try {
                            const cmdModule = (yield Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, dir, file))))).default;
                            const { name, aliases, category, execute, hideCommand } = cmdModule;
                            if (!name) {
                                console.warn(`The command "${path_1.default.join(__dirname, dir, file)}" doesn't have a name.`);
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
                                aliases.forEach((alias) => {
                                    if (client.commands.has(alias)) {
                                        console.warn(`The command "${alias}" has already been added.`);
                                    }
                                    else {
                                        client.commands.set(alias, cmdModule);
                                    }
                                });
                            }
                            if (hideCommand)
                                continue;
                            if (category) {
                                let commands = client.categories.get(category.toLowerCase());
                                if (!commands)
                                    commands = [category];
                                commands.push(name);
                                client.categories.set(category.toLowerCase(), commands);
                            }
                            else {
                                console.warn(`The command "${name}" doesn't have a category. It will default to "No Category".`);
                                let commands = client.categories.get("No Category");
                                if (!commands)
                                    commands = ["No Category"];
                                commands.push(name);
                                client.categories.set("No Category", commands);
                            }
                        }
                        catch (e) {
                            console.error(`Error loading commands: ${e.message}`);
                        }
                    }
                }
            }
        }
    });
}
exports.registerCommands = registerCommands;
function registerEvents(client, dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.default.promises.readdir(path_1.default.join(__dirname, dir));
        for (let file of files) {
            const stat = yield fs_1.default.promises.lstat(path_1.default.join(__dirname, dir, file));
            if (stat.isDirectory())
                registerEvents(client, path_1.default.join(dir, file));
            else {
                if (file.endsWith(".ts") || file.endsWith(".js")) {
                    let eventName = file.substring(0, file.length - 3);
                    try {
                        let eventModule = (yield Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, dir, file)))))
                            .default;
                        client.on(eventName, eventModule.bind(null, client));
                    }
                    catch (e) {
                        console.error(`Error loading events: ${e.message}`);
                    }
                }
            }
        }
    });
}
exports.registerEvents = registerEvents;
