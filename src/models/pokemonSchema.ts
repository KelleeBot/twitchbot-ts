import { model, Schema } from "mongoose";

const reqString = {
    type: String,
    required: true
};

const pokemonSchema = new Schema({
    channel: reqString,
    user: reqString,
    pokemons: {
        pokedexNum: Number,
        name: reqString,
        caughtWith: reqString,
        caughtOn: Date
    }
});

export default model("user-pokemons", pokemonSchema);
