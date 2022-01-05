import { Client } from "../Client";
import { log } from "../utils/utils";

export default (client: Client, address: string, port: number) => {
    log("SUCCESS", `${__filename}`, `Connected: ${address}:${port}`);
};
