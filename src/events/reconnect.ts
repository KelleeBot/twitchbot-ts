import { Client } from "../Client";
import { log } from "../utils/utils";

export default (client: Client) => {
    log("WARNING", `${__filename}`, "Reconnecting...");
};
