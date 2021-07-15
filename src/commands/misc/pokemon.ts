import { Command } from "../../interfaces/Command";
import pokemonSchema from "../../models/pokemonSchema";
import { log, setCooldown, errorMessage } from "../../utils/utils";

export default {
  name: "pokemon",
  category: "Misc",
  cooldown: 15,
  async execute({ client, channel, userstate }) {
    const obj = {
      channel: channel.slice(1),
      user: userstate.username.toLowerCase()
    };
    try {
      const result = await pokemonSchema.find(obj);
      if (!result.length) {
        return client.say(
          channel,
          `/me ${userstate["display-name"]}, you have not caught any Pokémon's yet.`
        );
      }

      const totalPokemons = result[0].pokemons.name.length;
      const pokemons = result[0].pokemons.name
        .map((m: any) => m)
        .slice(0, 5)
        .join(", ");

      setCooldown(client, this, channel, userstate);
      return client.say(
        channel,
        `/me ${userstate["display-name"]}, you have caught a total of ${totalPokemons} Pokémon! Here is your Pokédex (first 5): ${pokemons}.`
      );
    } catch (e) {
      log("ERROR", ".src/commands/misc/pokemon.ts", e.message);
      return errorMessage(client, channel);
    }
  }
} as Command;
