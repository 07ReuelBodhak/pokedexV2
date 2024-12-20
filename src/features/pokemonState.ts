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

interface pokemonImage {
  versions: {
    "generation-v": {
      "black-white": {
        animated: {
          back_default: string;
          front_default: string;
        };
      };
    };
  };
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
}

export interface pokemonDetail {
  data: pokemonSub[];
  error: null | string;
}
