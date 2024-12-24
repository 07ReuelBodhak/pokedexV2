import React, { useEffect, useState } from "react";
import Icon3 from "../SVG/Icon3";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./app";
import { RootState, AppDispatch } from "../../store";
import Card from "../Card/Card";
import Pokedex from "../SVG/Pokedex";
import { pokemonSub } from "../../features/pokemonState";
import PokemonDetails from "../Pokedex/PokemonDetails";

const Home: React.FC = () => {
  const [pokemonSelected, setPokemonSelected] = useState<pokemonSub | null>(
    null
  );

  const [isFocused, setIsFocused] = useState(false);
  const [pokemonName, setIsPokemonName] = useState("");

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        const pokemonList = await response.json();

        const detailedPokemon = await Promise.all(
          pokemonList.results.map(
            async (pokemon: { name: string; url: string }, index: number) => {
              const detailResponse = await fetch(pokemon.url);
              const details = await detailResponse.json();

              const speciesResponse = await fetch(details.species.url);
              const speciesInfo = await speciesResponse.json();

              const description =
                speciesInfo.flavor_text_entries.find(
                  (entry: any) => entry.language.name === "en"
                )?.flavor_text || null;

              const sprites = details.sprites;
              const image = {
                other: {
                  home: {
                    front_default: sprites.other.home.front_default || "",
                    back_default: sprites.back_default || "",
                    front_shiny: sprites.front_shiny || "",
                    back_shiny: sprites.back_shiny || "",
                  },
                  "official-artwork": {
                    front_default:
                      sprites.other["official-artwork"].front_default,
                  },
                },
                versions: {
                  "generation-v": {
                    "black-white": {
                      animated: {
                        back_default:
                          sprites.versions["generation-v"]?.["black-white"]
                            ?.animated?.back_default || "",
                        front_default:
                          sprites.versions["generation-v"]?.["black-white"]
                            ?.animated?.front_default || "",
                      },
                    },
                  },
                },
              };

              return {
                name: pokemon.name,
                abilities: details.abilities,
                base_experience: details.base_experience,
                image: image,
                description: description,
                types: details.types,
                stats: details.stats,
                gender_rate: speciesInfo.gender_rate,
                height: details.height,
                weight: details.weight,
                id: index,
              };
            }
          )
        );

        dispatch(fetchPokemon(detailedPokemon));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setIsLoading(false);
      }
    };

    if (pokemonDetails.length === 0) {
      fetchPokemonData();
    }
    if (pokemonDetails.length > 0 && !pokemonSelected) {
      setPokemonSelected(pokemonDetails[0]);
    }
  }, [dispatch, isLoading]);

  const pokemonDetails = useSelector(
    (state: RootState) => state.App.pokemon_details.data
  );

  const selectPokemon = (id: number) => {
    setPokemonSelected(pokemonDetails[id]);
    setToggle(true);
  };

  const handleSearch = () => {
    alert("search is successfull");
  };

  const handleToggle = () => {
    setToggle(false);
  };

  const previousIndex = (pokemonSelected?.id ?? 0) - 1;
  const previousPokemon = {
    id: previousIndex >= 0 ? previousIndex : undefined,
    name:
      previousIndex >= 0 && pokemonDetails[previousIndex]
        ? pokemonDetails[previousIndex].name
        : "",
    sprites:
      previousIndex >= 0 && pokemonDetails[previousIndex]
        ? pokemonDetails[previousIndex].image.versions["generation-v"][
            "black-white"
          ].animated.front_default
        : "",
  };

  const nextIndex = (pokemonSelected?.id ?? 0) + 1;
  const nextPokemon = {
    id: nextIndex < pokemonDetails.length ? nextIndex : undefined,
    name:
      nextIndex < pokemonDetails.length && pokemonDetails[nextIndex]
        ? pokemonDetails[nextIndex].name
        : "",
    sprites:
      nextIndex <= pokemonDetails.length && pokemonDetails[nextIndex]
        ? pokemonDetails[nextIndex].image.versions["generation-v"][
            "black-white"
          ].animated.front_default
        : "",
  };

  return (
    <div className="flex py-4 flex-col md:flex-row">
      <div className="flex flex-col lg:w-3/4 w-full gap-5 p-4">
        <div className="relative flex w-[95%]">
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={pokemonName}
            onChange={(e) => setIsPokemonName(e.target.value)}
            className={`bg-white w-full h-12 sm:h-14 px-4 rounded-xl shadow-lg outline-none border-2 transition-all duration-200 ease-in-out ${
              isFocused ? "border-red-600 shadow-md" : ""
            }`}
            placeholder="Search your Pokémon"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition-all duration-200"
          >
            <Icon3 className="w-5 sm:w-7" />
          </button>
        </div>
        <div className="grid mt-4 grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
          {pokemonDetails.map((pokemon, id) => (
            <Card
              selectedPokemon={pokemonSelected?.name ?? ""}
              handleClick={selectPokemon}
              key={id}
              id={id}
              name={pokemon.name}
              types={pokemon.types}
              image={
                pokemon.image.versions["generation-v"]["black-white"].animated
                  .front_default
              }
            />
          ))}
        </div>
      </div>
      <PokemonDetails
        handleClick={selectPokemon}
        prevPokemon={previousPokemon}
        nextPokemon={nextPokemon}
        pokemonSelected={pokemonSelected}
      />
      <div
        className={`lg:hidden ${
          toggle ? "translate-x-0" : "translate-x-[330px]"
        } z-30 transition-all duration-500 ease-out fixed right-3 bottom-20 md:right-8 md:bottom-8`}
      >
        <Pokedex
          handleToggle={handleToggle}
          handleClick={selectPokemon}
          prevPokemon={previousPokemon}
          nextPokemon={nextPokemon}
          pokemonDetail={pokemonSelected}
          className={` w-[300px] h-[500px] `}
        />
      </div>
    </div>
  );
};

export default Home;
