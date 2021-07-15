import { Userstate } from "tmi.js";
import { Client } from "../Client";
import { Flags } from "./Flags";

export type ExecuteParameters = {
    client: Client;
    userstate: Userstate;
    channel: string;
    message: string;
    args: string[];
    flags: Flags;
};
