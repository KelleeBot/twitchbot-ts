"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blacklist = new mongoose_1.Schema({
    _id: String
}, { strict: false });
exports.default = mongoose_1.model("blacklist", blacklist);
