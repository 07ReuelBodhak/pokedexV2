import { useState } from "react";
import { pokemonSub } from "../features/pokemonState";
import { sortPokemon } from "../utils/pokemonUtils";

type UsePokemonProps = {
  initialPokemonList: pokemonSub[];
  setPokemonSelected: React.Dispatch<React.SetStateAction<pokemonSub | null>>;
};

export const usePokemon = ({
  initialPokemonList,
  setPokemonSelected,
}: UsePokemonProps) => {
  const [isAscending, setIsAscending] = useState(true);

  const sortedPokemonList = sortPokemon(initialPokemonList, isAscending);

  const toggleSortOrder = () => {
    setIsAscending((prev) => {
      const newIsAscending = !prev;
      return newIsAscending;
    });

    const newSortedPokemonList = sortPokemon(initialPokemonList, !isAscending); // Toggle the sort order before setting
    setPokemonSelected(newSortedPokemonList[0]);
  };

  return {
    sortedPokemonList,
    isAscending,
    toggleSortOrder,
  };
};
