"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
exports.default = (client, address, port) => {
    utils_1.log("SUCCESS", "./src/events/connected.ts", `Connected: ${address}:${port}`);
};
