import { AppDispatch } from "../../store";
import {
  fetchPokemonStart,
  fetchPokemonSuccess,
  fetchPokemonFailure,
  fetchPokemonDetailsStart,
  fetchPokemonDetailsSuccess,
  fetchPokemonDetailsFailure,
} from "../../features/state";

export const fetchPokemon = () => async (dispatch: AppDispatch) => {
  dispatch(fetchPokemonStart());
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }
    const data = await response.json();
    dispatch(fetchPokemonSuccess(data.results));

    data.results.forEach(async (pokemon: { name: string; url: string }) => {
      dispatch(fetchPokemonDetailsStart());
      try {
        const detailResponse = await fetch(pokemon.url);
        if (!detailResponse.ok) {
          throw new Error("Failed to fetch details");
        }
        const details = await detailResponse.json();
        const otherResponse = await fetch(details.species.url);
        const otherInfo = await otherResponse.json();
        const description =
          otherInfo.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          )?.flavor_text || null;
        dispatch(
          fetchPokemonDetailsSuccess({
            name: pokemon.name,
            abilities: details.abilities,
            base_experience: details.base_experience,
            image: details.sprites,
            description: description,
            types: details.types,
            stats: details.stats,
            gender_rate: otherInfo.gender_rate,
          })
        );
      } catch (error: any) {
        fetchPokemonDetailsFailure(error.message);
      }
    });
  } catch (error: any) {
    dispatch(fetchPokemonFailure(error.message));
  }
};
