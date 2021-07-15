import { Client } from "../Client";
import { log } from "../utils/utils";

export default (client: Client, address: string, port: number) => {
  log("SUCCESS", "./src/events/connected.ts", `Connected: ${address}:${port}`);
};
