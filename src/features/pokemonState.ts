export interface pokemonEntry {
  name: string;
  url: string;
}

export interface PokemonData {
  data: pokemonEntry[];
  loading: boolean;
  error: string | null;
}

export interface pokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface pokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface pokemonTypeData {
  type: {
    name: string;
  };
}

export interface pokemonImage {
  front_default: string;
  other: {
    home: {
      front_default: string;
      back_default?: string;
      front_shiny?: string;
      back_shiny?: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
  versions: {
    "generation-v": {
      "black-white": {
        animated: {
          back_default: string;
          front_default: string;
        };
      };
      front_default: string;
    };
  };
}

export interface EvolutionData {
  sprites: pokemonImage;
  name: string;
  level: number | null;
}

export interface pokemonSub {
  abilities: pokemonAbility[];
  image: pokemonImage;
  base_experience: number;
  name: string;
  types: pokemonTypeData[];
  description: string | null;
  gender_rate: number;
  stats: pokemonStat[];
  height: number;
  weight: number;
  id: number;
  index: number;
}

export interface pokemonDetail {
  data: pokemonSub[];
  error: null | string;
}
