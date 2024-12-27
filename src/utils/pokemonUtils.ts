import { pokemonSub } from "../features/pokemonState";

export const sortPokemon = (
  pokemonList: pokemonSub[],
  isAscending: boolean
) => {
  const sortedList = [...pokemonList].sort((a, b) => {
    return isAscending ? a.id - b.id : b.id - a.id;
  });

  return sortedList.map((pokemon, index) => ({
    ...pokemon,
    index: index,
  }));
};
