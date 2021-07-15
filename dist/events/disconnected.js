"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
exports.default = (client, reason) => {
    utils_1.log("ERROR", "./src/events/disconnected.ts", `Disconnected: ${reason}`);
};
