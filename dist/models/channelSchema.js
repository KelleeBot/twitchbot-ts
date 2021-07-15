"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const channelSchema = new mongoose_1.Schema({
    _id: String,
    prefix: {
        default: "!",
        type: String
    },
    disabledCommands: Array,
    commandPerms: {},
    commandCooldowns: {},
    commandAlias: {}
});
exports.default = mongoose_1.model("channel-schema", channelSchema);
