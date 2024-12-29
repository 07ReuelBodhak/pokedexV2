import React, { useEffect, useState, useRef } from "react";
import Icon3 from "../SVG/Icon3";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./app";
import { RootState, AppDispatch } from "../../store";
import Card from "../Card/Card";
import Pokedex from "../SVG/Pokedex";
import { pokemonSub } from "../../features/pokemonState";
import { useNavigate } from "react-router-dom";
import PokemonDetails from "../Pokedex/PokemonDetails";
import DownwardChevron from "../SVG/DownwardChevron";
import { usePokemon } from "../../Hooks/usePokemon";
import "./style.css";
import PokeballSpinner from "../SVG/PokeballSpinner";

interface classProps {
  mainRef: React.RefObject<HTMLDivElement>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  bottomReached: boolean;
  setBottomReached: (value: boolean) => void;
  isScrolling: boolean;
}

const Home: React.FC<classProps> = ({
  mainRef,
  offset,
  setOffset,
  bottomReached,
  setBottomReached,
  isScrolling,
}) => {
  const naviagte = useNavigate();
  const [pokemonSelected, setPokemonSelected] = useState<pokemonSub | null>(
    null
  );
  const pokemonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [pokemonName, setIsPokemonName] = useState<string>("");

  const [toggle, setToggle] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [dummyPokemonList, setDummyPokemonList] = useState<any[]>([]);

  const pokemonDetails = useSelector(
    (state: RootState) => state.App.pokemon_details.data
  );

  const { sortedPokemonList, isAscending, toggleSortOrder } = usePokemon({
    initialPokemonList: pokemonDetails,
    setPokemonSelected,
  });

  useEffect(() => {
    if (
      !bottomReached ||
      !isAscending ||
      isLoading ||
      pokemonDetails.length > 1000
    )
      return;
    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=36`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        const pokemonList = await response.json();

        const detailedPokemon = await Promise.all(
          pokemonList.results.map(
            async (pokemon: { name: string; url: string }) => {
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
                    front_default:
                      sprites.versions["generation-v"]?.["black-white"]
                        ?.front_default || "",
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
                id: details.id,
                index: details.id,
              };
            }
          )
        );

        if (!pokemonSelected || pokemonName.length !== 0) {
          setPokemonSelected(detailedPokemon[0]);
        }

        dispatch(fetchPokemon(detailedPokemon));
        setOffset((prevOffset) => prevOffset + 36);
        setBottomReached(false);
        setIsLoading(false);
      } catch (error) {
        naviagte("error");
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [dispatch, offset, isAscending, bottomReached]);

  const scrollToPokemon = (index: number) => {
    const pokemonRef = pokemonRefs.current[index];
    if (pokemonRef) {
      pokemonRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const selectPokemon = (id: number) => {
    setPokemonSelected(sortedPokemonList[id]);
    setToggle(true);
    setIsSearching(false);
    setIsPokemonName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsPokemonName(value);
    setIsSearching(true);
    if (value && value !== " ") {
      const filteredPokemon = sortedPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setDummyPokemonList(filteredPokemon);
    } else {
      setIsSearching(false);
      setDummyPokemonList([]);
    }
  };

  const handleSearch = () => {
    setIsFocused(false);
  };

  const handleToggle = () => {
    setToggle(false);
  };

  const selectedPokemonIndex = sortedPokemonList.findIndex(
    (pokemon) => pokemon.index === pokemonSelected?.index
  );

  const previousIndex = selectedPokemonIndex - 1;
  const nextIndex = selectedPokemonIndex + 1;

  const previousPokemon = {
    id:
      previousIndex >= 0 ? sortedPokemonList[previousIndex]?.index : undefined,
    name:
      previousIndex >= 0 && sortedPokemonList[previousIndex]
        ? sortedPokemonList[previousIndex].name
        : "",
    sprites:
      previousIndex >= 0 && sortedPokemonList[previousIndex]
        ? sortedPokemonList[previousIndex].image.versions["generation-v"][
            "black-white"
          ].animated.front_default ||
          sortedPokemonList[previousIndex].image.versions["generation-v"]
            .front_default
        : "",
  };

  const nextPokemon = {
    id:
      nextIndex < sortedPokemonList.length
        ? sortedPokemonList[nextIndex]?.index
        : undefined,
    name:
      nextIndex < sortedPokemonList.length && sortedPokemonList[nextIndex]
        ? sortedPokemonList[nextIndex].name
        : "",
    sprites:
      nextIndex < sortedPokemonList.length && sortedPokemonList[nextIndex]
        ? sortedPokemonList[nextIndex].image.versions["generation-v"][
            "black-white"
          ].animated.front_default ||
          sortedPokemonList[nextIndex].image.versions["generation-v"]
            .front_default
        : "",
  };

  return (
    <div className="flex py-4 flex-col md:flex-row">
      <div
        className={`${
          pokemonSelected === null && "lg:w-full"
        } flex flex-col lg:w-3/4 w-full gap-5 p-4`}
      >
        <div className="flex relative flex-col w-[95%]">
          <div className="flex relative flex-col w-[95%]">
            <div className="flex relative">
              <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                }}
                value={pokemonName}
                onChange={handleChange}
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
            <div
              className={`${
                isSearching
                  ? "translate-y-0 flex"
                  : "translate-y-[-30px] hidden"
              } absolute shadow-lg rounded-xl top-14 max-h-40 no-scrollbar overflow-auto z-30 bg-white p-3 flex flex-col gap-2 w-full mt-2`}
            >
              {dummyPokemonList.length === 0 ? (
                <h1 className="text-gray-500">No search result found</h1>
              ) : (
                dummyPokemonList.map((pokemon, index) => (
                  <button
                    onClick={() => {
                      selectPokemon(pokemon.index);
                      scrollToPokemon(pokemon.index);
                    }}
                    className="flex  hover:opacity-80 transition-opacity ease-out duration-100 items-center gap-4 py-1 px-2"
                    key={index}
                  >
                    <img
                      className="w-10"
                      src={
                        pokemon.image.versions["generation-v"]["black-white"]
                          .animated.front_default
                      }
                    />
                    <h1 className="font-semibold font-mono text-gray-500">
                      {pokemon.name}
                    </h1>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex z-20 space-x-10 p-2">
          <button
            onClick={toggleSortOrder}
            className="flex px-1 justify-center items-center"
          >
            <h1 className="text-gray-900 font-semibold">
              {isAscending ? "Ascending" : "Descending"}
            </h1>
            <DownwardChevron className="w-5 opacity-55 translate-y-0.5 h-5" />
          </button>
        </div>

        <div className="grid mt-4 relative grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
          {sortedPokemonList.map((pokemon, id) => (
            <div
              ref={(el) => (pokemonRefs.current[id] = el)}
              key={id}
              className={`transform opacity-0 translate-y-5 transition-all duration-500 ease-in-out`}
              style={{
                animation: `fadeIn 0.5s ease-in-out 0.5s forwards`,
                animationFillMode: "forwards",
              }}
            >
              <Card
                selectedPokemon={pokemonSelected?.name ?? ""}
                handleClick={selectPokemon}
                id={id}
                name={pokemon.name}
                types={pokemon.types}
                image={
                  pokemon.image.versions["generation-v"]["black-white"].animated
                    .front_default ||
                  pokemon.image.versions["generation-v"].front_default
                }
              />
            </div>
          ))}
          <div className="flex absolute bottom-0 w-full translate-y-14 justify-center">
            {bottomReached && (
              <>
                {isLoading ? (
                  <PokeballSpinner className="w-10 h-10 animate-spin" />
                ) : pokemonDetails.length > 1000 ? (
                  <h1 className="font-mono text-xl text-gray-700">
                    All Caught Up
                  </h1>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
      {pokemonSelected !== null && (
        <PokemonDetails
          handleClick={selectPokemon}
          prevPokemon={previousPokemon}
          nextPokemon={nextPokemon}
          pokemonSelected={pokemonSelected}
        />
      )}
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
      {isScrolling && (
        <button
          onClick={() => {
            if (mainRef.current) {
              mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="fixed hover:bg-red-400 transition-all duration-100 ease-out rounded-full text-white font-bold bg-red-500 p-3 bottom-6 left-3"
        >
          top
        </button>
      )}
    </div>
  );
};

export default React.memo(Home);
