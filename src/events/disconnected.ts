import { Client } from "../Client";
import { log } from "../utils/utils";

export default (client: Client, reason: string) => {
  log("ERROR", "./src/events/disconnected.ts", `Disconnected: ${reason}`);
};
