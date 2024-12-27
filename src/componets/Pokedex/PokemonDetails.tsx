import React, { useRef } from "react";
import { pokemonSub } from "../../features/pokemonState";
import GenderSymbols from "../SVG/GenderSymbols";
import "./style.css";
import Icon4 from "../SVG/Icon4";

interface pokemonDetail {
  id: number | undefined;
  name: string;
  sprites: string;
}

interface classProps {
  pokemonSelected: pokemonSub | null;
  prevPokemon: pokemonDetail;
  nextPokemon: pokemonDetail;
  handleClick: (id: number) => void;
}

const PokemonDetails: React.FC<classProps> = ({
  pokemonSelected,
  prevPokemon,
  nextPokemon,
  handleClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getAbbreviation = (option: string): { name: string; bg: string } => {
    switch (option) {
      case "hp":
        return { name: "HP", bg: "bg-red-500" };
      case "attack":
        return { name: "ATK", bg: "bg-orange-300" };
      case "defense":
        return { name: "DEF", bg: "bg-yellow-300" };
      case "special-attack":
        return { name: "SpA", bg: "bg-blue-300" };
      case "special-defense":
        return { name: "SpD", bg: "bg-green-300" };
      case "speed":
        return { name: "SPD", bg: "bg-pink-500" };
      default:
        return { name: "", bg: "" };
    }
  };

  const handleChange = (id: number) => {
    handleClick(id);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const determineGender = (genderRate: number) => {
    switch (genderRate) {
      case 0:
        return 1;
      case 8:
        return 2;
      case -1:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return 0;
      default:
        return 0;
    }
  };

  const handleColor = (type: string) => {
    switch (type) {
      case "grass":
        return "bg-green-400";
      case "poison":
        return "bg-purple-400";
      case "fire":
        return "bg-orange-400";
      case "water":
        return "bg-blue-400";
      case "flying":
        return "bg-blue-700";
      case "bug":
        return "bg-green-800";
      case "ice":
        return "bg-blue-300";
      case "ground":
        return "bg-yellow-800";
      case "psychic":
        return "bg-purple-900";
      case "dragon":
        return "bg-yellow-600";
      case "normal":
        return "bg-blue-500";
      case "steel":
        return "bg-gray-700";
      case "fighting":
        return "bg-red-600";
      case "dark":
        return "bg-black";
      case "electric":
        return "bg-yellow-400";
      case "fairy":
        return "bg-pink-300";
      case "ghost":
        return "bg-blue-950";
      case "rock":
        return "bg-stone-800";
      default:
        break;
    }
  };

  const genderRate = pokemonSelected?.gender_rate ?? 0;

  return (
    <div className="hidden rounded-xl lg:block width sticky top-3 h-[80vh] translate-y-16 shadow-lg bg-white">
      <div className="absolute right-2 top-10 z-10">
        <GenderSymbols gender={determineGender(genderRate)} />
      </div>
      <div className="absolute -top-16 left-0 w-full flex flex-col justify-center items-center z-20">
        <img
          className="w-48 -translate-x-2"
          src={pokemonSelected?.image.other["official-artwork"].front_default}
          alt={pokemonSelected?.name}
        />
        <span className="text-gray-400 font-mono text-md">
          #{(pokemonSelected?.id ?? 0) + 1}
        </span>
        <h1 className=" font-mono font-bold text-2xl">
          {pokemonSelected?.name}
        </h1>
        <div
          ref={scrollRef}
          className="scroll-smooth h-[52vh] no-scrollbar overflow-auto"
        >
          <div className="flex flex-wrap gap-3 justify-center items-center mt-2 z-20">
            {pokemonSelected?.types.map((type, id) => (
              <div
                className={`${handleColor(
                  type.type.name
                )} rounded-lg border-2 border-gray-500 px-4 py-0.5`}
                key={id}
              >
                <p className="text-white">{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-2 flex-col px-3 w-full items-center">
            <h1 className="font-semibold text-md">POKEDEX ENTRY</h1>
            <p
              style={{ wordSpacing: "-2px" }}
              className="font-mono mt-1 text-gray-500 text-center"
            >
              {pokemonSelected?.description}
            </p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-semibold font-mono mt-2">ABILITY</h1>
            <div className="flex gap-3 mt-2 mb-2 justify-center flex-wrap">
              {pokemonSelected?.abilities.map((ability, ind) => (
                <div
                  className={`${
                    ability.is_hidden
                      ? "border-red-500 border-[1.6px]"
                      : "border-gray-500 border-[1.6px]"
                  } bg-gray-100 gap-1 py-1 justify-center items-center flex px-3 rounded-full`}
                  key={ind}
                >
                  {ability.ability.name}
                  {ability.is_hidden && (
                    <Icon4 className="w-3 translate-x-1 opacity-25" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 flex-col justify-evenly px-3 py-2">
            <div className="flex justify-evenly">
              <div className="flex justify-center items-center gap-2 flex-col">
                <h1 className="font-mono">Height</h1>
                <div className="px-10 bg-gray-200 rounded-xl">
                  {pokemonSelected?.height
                    ? (pokemonSelected.height / 10).toFixed(1)
                    : "N/A"}
                  m
                </div>
              </div>
              <div className="flex items-center gap-2 flex-col">
                <h1 className="font-mono">Weight</h1>
                <div className="px-10 bg-gray-200 rounded-xl">
                  {pokemonSelected?.weight
                    ? (pokemonSelected.weight / 10).toFixed(1)
                    : "N/A"}
                  kg
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-col items-center">
              <h1 className="font-mono">Base Experience</h1>
              <div className="px-10 bg-gray-200 rounded-xl">
                {pokemonSelected?.base_experience} EXP
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col p-2">
            <h1 className="text-center font-mono font-semibold ">STATS</h1>
            <div className="justify-evenly flex flex-row">
              {pokemonSelected?.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex py-0.5 flex-col w-10 justify-center items-center rounded-full bg-gray-200"
                >
                  <div
                    className={`${
                      getAbbreviation(stat.stat.name).bg
                    } rounded-full p-1 text-white text-center w-9`}
                  >
                    {getAbbreviation(stat.stat.name).name}
                  </div>
                  <p>{stat.base_stat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center px-2 py-2">
            <div className=" flex gap-2 justify-center items-center py-2 w-[95%] rounded-2xl bg-gray-300">
              {prevPokemon.id !== undefined && (
                <div
                  className="space-x-1 cursor-pointer flex justify-center items-center"
                  onClick={() => handleChange(prevPokemon.id ?? -1)}
                >
                  <p>{"<"}</p>
                  <img className="w-8" src={prevPokemon.sprites} />
                  <p
                    style={{ fontSize: "14px" }}
                    className="font-mono font-semibold"
                  >
                    {prevPokemon.name}
                  </p>
                </div>
              )}

              {nextPokemon.id !== undefined && prevPokemon.id !== undefined && (
                <div className="h-7 border-[1.5px] border-gray-500"></div>
              )}

              {nextPokemon.id !== undefined && (
                <div
                  className="space-x-1 cursor-pointer flex justify-center items-center"
                  onClick={() => handleChange(nextPokemon.id ?? -1)}
                >
                  <p
                    style={{ fontSize: "14px" }}
                    className="font-mono font-semibold"
                  >
                    {nextPokemon.name}
                  </p>
                  <img className="w-8" src={nextPokemon.sprites} />
                  <p>{">"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PokemonDetails);
