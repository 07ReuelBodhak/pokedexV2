import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PokemonData,
  pokemonEntry,
  pokemonSub,
  pokemonDetail,
} from "./pokemonState";

interface NavState {
  option: string;
}

interface AppState {
  nav: NavState;
  pokemon: PokemonData;
  pokemon_details: pokemonDetail;
}

const initialState: AppState = {
  nav: {
    option: "home",
  },
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  pokemon_details: {
    data: [],
    error: null,
  },
};

const navSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.nav.option = action.payload;
    },

    fetchPokemonStart: (state) => {
      state.pokemon.loading = true;
      state.pokemon.error = null;
    },

    fetchPokemonSuccess: (state, action: PayloadAction<pokemonEntry[]>) => {
      state.pokemon.loading = false;
      state.pokemon.data = action.payload;
    },

    fetchPokemonFailure: (state, action: PayloadAction<string>) => {
      state.pokemon.loading = false;
      state.pokemon.error = action.payload;
    },

    fetchPokemonDetailsStart: (state) => {
      state.pokemon.loading = true;
    },

    fetchPokemonDetailsSuccess: (state, action: PayloadAction<pokemonSub>) => {
      state.pokemon.loading = false;
      state.pokemon_details.data.push(action.payload);
    },

    fetchPokemonDetailsFailure: (state, action: PayloadAction<string>) => {
      state.pokemon.loading = false;
      state.pokemon_details.error = action.payload;
    },
  },
});

export const {
  change,
  fetchPokemonStart,
  fetchPokemonSuccess,
  fetchPokemonFailure,
  fetchPokemonDetailsStart,
  fetchPokemonDetailsSuccess,
  fetchPokemonDetailsFailure,
} = navSlice.actions;
export default navSlice.reducer;
