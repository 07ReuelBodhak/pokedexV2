import React, { useRef } from "react";
import "./style.css";
import { pokemonSub } from "../../features/pokemonState";
import Icon4 from "./Icon4";

interface pokemonDetail {
  id: number | undefined;
  name: string;
  sprites: string;
}

interface Props {
  className?: string;
  pokemonDetail: pokemonSub | null;
  prevPokemon: pokemonDetail;
  nextPokemon: pokemonDetail;
  handleClick: (id: number) => void;
  handleToggle: () => void;
}

const Pokedex: React.FC<Props> = ({
  className,
  pokemonDetail,
  prevPokemon,
  nextPokemon,
  handleClick,
  handleToggle,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    handleToggle();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleChange = (id: number) => {
    handleClick(id);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleStateColor = (type: string) => {
    switch (type) {
      case "hp":
        return "bg-red-600";
      case "attack":
        return "bg-yellow-600";
      case "defense":
        return "bg-blue-500";
      case "special-attack":
        return "bg-green-500";
      case "special-defense":
        return "bg-purple-500";
      case "speed":
        return "bg-orange-400";
      default:
        return "bg-pink-500";
    }
  };
  const handleBackgroundColor = (type: string) => {
    if (type == "fire") {
      return "bg-yellow-400";
    } else if (type == "grass" || type == "bug") {
      return "bg-green-400";
    } else if (
      type == "water" ||
      type == "ice" ||
      type == "normal" ||
      type == "flying"
    ) {
      return "bg-blue-500";
    } else if (type == "psychic" || type == "poison" || type == "ghost") {
      return "bg-purple-400";
    } else if (type == "fairy") {
      return "bg-pink-500";
    } else if (type == "fighting") {
      return "bg-red-600";
    } else {
      return "bg-gray-400";
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
  return (
    <svg
      className={className}
      width="276"
      height="427"
      viewBox="0 0 276 427"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="276" height="427" fill="#1E1E1E" />
      <rect
        x="0.5"
        y="0.5"
        width="275"
        height="426"
        rx="13.5"
        fill="#302323"
        stroke="black"
      />
      <path
        d="M255 6.5H15C8.09644 6.5 2.5 12.0964 2.5 19V407C2.5 413.904 8.09645 419.5 15 419.5H255C261.904 419.5 267.5 413.904 267.5 407V19C267.5 12.0964 261.904 6.5 255 6.5Z"
        fill="#E51414"
        stroke="black"
      />
      <path
        d="M28 398.5V385.5H45L51 375H218L226 385.5H241V398.5H226L218 408H51L45 398.5H28Z"
        fill="#322929"
        stroke="black"
      />
      <path
        d="M32.5 52C41.5815 52 49 44.8672 49 36C49 27.1328 41.5815 20 32.5 20C23.4185 20 16 27.1328 16 36C16 44.8672 23.4185 52 32.5 52Z"
        fill="#1DB8F6"
        stroke="black"
        strokeWidth="2"
      />
      <ellipse cx="32" cy="30.5" rx="7" ry="5.5" fill="#75CDE5" />
      <path
        d="M62.1505 45C62.1505 79.5946 27.8796 57.7186 17 71.4547V365H252V45H62.1505Z"
        fill="#423838"
        stroke="black"
      />
      <g>
        <path
          d="M67.3472 54C67.3472 86.1081 36.7222 65.8045 27 78.5533V351H237V54H67.3472Z"
          fill="white"
          fillOpacity="0.9"
          stroke="black"
        />
        <foreignObject x="30" y="79" width="200" height="270">
          <div
            style={{ scrollbarWidth: "none" }}
            ref={scrollContainerRef}
            className="relative scroll-smooth gap-4 overflow-auto flex flex-col h-full w-full"
          >
            {/* Pokemon detail */}
            <div className="flex gap-2  w-full h-28 flex-row">
              <div
                className={`${handleBackgroundColor(
                  pokemonDetail?.types[0]?.type?.name || ""
                )} border-2 flex-col h-24 border-black rounded-md right-1`}
              >
                <img
                  className="w-24"
                  src={
                    pokemonDetail?.image.other["official-artwork"].front_default
                  }
                />
                <h1 className="mt-1 font-semibold ml-2 text-lg">
                  {pokemonDetail?.name}
                </h1>
              </div>
              <div className="w-1/2 p-1 no-scrollbar overflow-auto">
                <p className=" font-semibold text-sm break">
                  {pokemonDetail?.description}
                </p>
              </div>
            </div>
            {/* Pokemon types */}
            <div className="flex justify-center gap-3 flex-wrap">
              {pokemonDetail?.types.map((type, ind) => (
                <div
                  className={`${handleColor(
                    type.type.name
                  )} rounded-lg px-2 border-gray-500 border-[1.5px] sm:px-2`}
                  key={ind}
                >
                  <p className="text-white mb-1">{type.type.name}</p>
                </div>
              ))}
            </div>
            {/* Pokemon info */}
            <div className="flex flex-wrap gap-3 flex-row justify-evenly border-2 px-3 py-2 border-gray-400">
              <div className="flex gap-2 flex-col">
                <h1 className="font-mono">Height</h1>
                <div className="px-2 bg-gray-300 rounded-xl">
                  {pokemonDetail?.height
                    ? (pokemonDetail.height / 10).toFixed(1)
                    : "N/A"}
                  m
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <h1 className="font-mono">Weight</h1>
                <div className="px-2 bg-gray-300 rounded-xl">
                  {pokemonDetail?.weight
                    ? (pokemonDetail.weight / 10).toFixed(1)
                    : "N/A"}
                  kg
                </div>
              </div>
              <div className="flex gap-2 flex-col items-center">
                <h1 className="font-mono">Base Experience</h1>
                <div className="px-10 bg-gray-300 rounded-xl">
                  {pokemonDetail?.base_experience} EXP
                </div>
              </div>
            </div>
            {/* Pokemon Ability */}
            <div className="flex flex-col border-2 p-1 border-gray-400">
              <h1 className="font-mono text-lg text-center">Ability</h1>
              <div className="flex gap-3 mt-2 mb-2 justify-center flex-wrap">
                {pokemonDetail?.abilities.map((ability, ind) => (
                  <div
                    className={`${
                      ability.is_hidden
                        ? "border-red-500 border-[1.6px]"
                        : "border-gray-500 border-[1.6px]"
                    } bg-gray-300 gap-1 justify-center items-center flex px-1 rounded-full`}
                    key={ind}
                  >
                    {ability.ability.name}
                    {ability.is_hidden && (
                      <Icon4 className="w-3 mt-1 opacity-25" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Pokemon Stats */}
            <div className="flex p-1 gap-1 flex-col px-2 border-gray-400 border-2">
              <h1 className="text-lg font-mono">Stats</h1>
              {pokemonDetail?.stats.map((stat, ind) => (
                <div key={ind} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">{stat.stat.name}</p>
                    <p className="text-sm font-semibold translate-y-1">
                      {stat.base_stat}
                    </p>
                  </div>
                  {/* Progress bar container */}
                  <div className="h-[6px] rounded-full bg-gray-900 w-full">
                    <div
                      style={{
                        transition: "width 0.9s ease", // Inline transition
                        width: `${(stat.base_stat / 255) * 100}%`, // Dynamic width
                      }}
                      className={`${handleStateColor(
                        stat.stat.name
                      )} rounded-full h-full`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pokemon Evolution */}
            {/* Next and previous */}
            <div className="flex px-2 gap-3 justify-evenly border-gray-400 border-2 py-2 mb-1 flex-row ">
              {prevPokemon.id !== undefined && (
                <div className="flex justify-center items-center flex-col gap-2">
                  <img className="h-12 w-12" src={prevPokemon.sprites} />
                  <button
                    onClick={() => handleChange(prevPokemon.id ?? -1)}
                    className="bg-blue-400 px-1 rounded-md h-7"
                  >
                    prev
                  </button>
                </div>
              )}
              {nextPokemon.id !== undefined && (
                <div className="flex justify-center items-center flex-col gap-2">
                  <img className="h-12 w-12" src={nextPokemon.sprites} />
                  <button
                    onClick={() => handleChange(nextPokemon.id ?? -1)}
                    className="bg-blue-400 px-1 rounded-md h-7"
                  >
                    next
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleClose}
              className=" bg-red-500 rounded-lg mb-2 hover:bg-red-400 transition-colors duration-150 ease-out"
            >
              close
            </button>
          </div>
        </foreignObject>
      </g>
      <rect x="81" y="17" width="51" height="4" rx="2" fill="#362525" />
      <rect x="135" y="17" width="51" height="4" rx="2" fill="#362525" />
      <circle cx="134.5" cy="391.5" r="10.5" fill="#F1EAEA" />
    </svg>
  );
};

export default React.memo(Pokedex);
