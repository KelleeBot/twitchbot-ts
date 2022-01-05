import TMI, { Options } from "tmi.js";
import { ChannelInfo, Command, UserInfo } from "./interfaces";
import { Model } from "mongoose";

interface Client {
    commands: Map<string, Command>;
    categories: Map<string, string[]>;
    channelInfoCache: Map<string, ChannelInfo>;
    userInfoCache: Map<string, UserInfo>;
    blacklistCache: Set<string>;
    famousCache: Array<string>;
    DBChannel: Model<ChannelInfo>;
    DBUser: Model<UserInfo>;
    DBBlacklist: Model<object>;
    DBFamousLinks: Model<object>;
    channelCooldowns: Map<string, Map<string, Map<string, number>>>;
    globalCooldowns: Map<string, Map<string, number>>;
}

class Client extends TMI.Client {
    constructor(options: Options) {
        super(options);
        this.commands = new Map();
        this.categories = new Map();
        this.channelInfoCache = new Map();
        this.userInfoCache = new Map();
        this.blacklistCache = new Set();
        this.famousCache = new Array();
        this.importSchemas();
        this.channelCooldowns = new Map();
        this.globalCooldowns = new Map();
    }

    async importSchemas() {
        this.DBChannel = (await import("./models/channelSchema")).default;
        this.DBUser = (await import("./models/userSchema")).default;
        this.DBBlacklist = (await import("./models/blacklistSchema")).default;
        this.DBFamousLinks = (await import("./models/famousSchema")).default;
    }
}
export { Client };
