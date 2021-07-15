"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reqString = {
    type: String,
    required: true
};
const pokemonSchema = new mongoose_1.Schema({
    channel: reqString,
    user: reqString,
    pokemons: {
        pokedexNum: Number,
        name: reqString,
        caughtWith: reqString,
        caughtOn: Date
    }
});
exports.default = mongoose_1.model("user-pokemons", pokemonSchema);
