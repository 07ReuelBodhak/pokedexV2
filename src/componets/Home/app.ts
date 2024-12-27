import { AppDispatch } from "../../store";
import {
  fetchPokemonStart,
  fetchPokemonSuccess,
  fetchPokemonFailure,
  fetchPokemonDetailsStart,
  fetchPokemonDetailsSuccess,
  fetchPokemonDetailsFailure,
} from "../../features/state";

export const fetchPokemon =
  (pokemonList: any[]) => async (dispatch: AppDispatch) => {
    dispatch(fetchPokemonStart());

    try {
      dispatch(fetchPokemonSuccess(pokemonList));

      pokemonList.forEach((pokemon) => {
        dispatch(fetchPokemonDetailsStart());
        try {
          dispatch(fetchPokemonDetailsSuccess(pokemon));
        } catch (error: any) {
          dispatch(fetchPokemonDetailsFailure(error.message));
        }
      });
    } catch (error: any) {
      dispatch(fetchPokemonFailure(error.message));
    }
  };

export const types = [
  "grass",
  "poison",
  "fire",
  "water",
  "flying",
  "bug",
  "ice",
  "ground",
  "psychic",
  "normal",
  "steel",
  "fighting",
  "dark",
  "electric",
  "fairy",
  "ghost",
  "rock",
];
