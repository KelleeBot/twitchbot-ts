import TMI from "tmi.js";
import { Command } from "./interfaces/Command";
import { ChannelInfo } from "./interfaces/ChannelInfo";
import { Model } from "mongoose";

export declare class Client extends TMI.Client {
  public commands: Map<string, Command>;
  public categories: Map<string, string[]>;
  public channelInfoCache: Map<string, ChannelInfo>;
  public DBChannel: Model<ChannelInfo>;
  public channelCooldowns: Map<string, Map<string, Map<string, number>>>;
  public globalCooldowns: Map<string, Map<string, number>>;
}
