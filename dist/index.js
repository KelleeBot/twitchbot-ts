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
const mongoose_1 = __importDefault(require("mongoose"));
const tmi_js_1 = __importDefault(require("tmi.js"));
const registry_1 = require("./utils/registry");
const utils_1 = require("./utils/utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`${process.env.MONGO_PATH}`);
        utils_1.log("SUCCESS", "./src/index.ts", "Successfully connected to the database.");
    }
    catch (e) {
        utils_1.log("ERROR", "./src/index.ts", `Error connecting to database: ${e}`);
        process.exit(1);
    }
    try {
        const opts = {
            options: {
                debug: true
            },
            connection: {
                reconnect: true,
                secure: true,
                timeout: 180000,
                reconnectDecay: 1.4,
                reconnectInterval: 1000
            },
            identity: {
                username: `${process.env.BOT_USERNAME}`,
                password: `${process.env.OAUTH_TOKEN}`
            },
            channels: [`${process.env.CHANNEL_NAME}`]
        };
        const client = new tmi_js_1.default.client(opts);
        client.connect();
        client.commands = new Map();
        client.categories = new Map();
        client.channelInfoCache = new Map();
        client.DBChannel = (yield Promise.resolve().then(() => __importStar(require("./models/channelSchema")))).default;
        client.DBBlacklist = (yield Promise.resolve().then(() => __importStar(require("./models/blacklistSchema")))).default;
        const blacklistFetch = yield client.DBBlacklist.findByIdAndUpdate("blacklist", {}, { new: true, upsert: true, setDefaultsOnInsert: true });
        //@ts-ignore
        client.blacklistCache = new Set(blacklistFetch.blacklisted);
        client.channelCooldowns = new Map();
        client.globalCooldowns = new Map();
        yield registry_1.registerEvents(client, "../events");
        yield registry_1.registerCommands(client, "../commands");
    }
    catch (e) {
        utils_1.log("ERROR", "./src/index.ts", `An error has occurred: ${e}.`);
    }
    utils_1.log("SUCCESS", "./src/index.ts", "Successfully loaded all commands, events, schemas, and connected to MongoDB.");
}))();
