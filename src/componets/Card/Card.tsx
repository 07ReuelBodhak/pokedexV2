import React from "react";
import { pokemonTypeData } from "../../features/pokemonState";

interface CardProps {
  image: string;
  name: string;
  types: pokemonTypeData[];
  selectedPokemon: string;
  id: number;
  handleClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  image,
  types,
  selectedPokemon,
  handleClick,
}) => {
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
      case "normal":
        return "bg-blue-700";
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
    <>
      <div
        onClick={() => handleClick(id)}
        className={`${
          selectedPokemon === name ? "border-red-600" : ""
        } relative bg-s sm:cursor-pointer transition-all ease-out border-b-2 duration-200 hover:border-red-600 shadow-md h-36 flex justify-center md:w-[90%] lg:w-[80%] sm:w-40 items-center flex-col p-3 z-10 rounded-2xl bg-white`}
      >
        <img className="absolute -top-7 w-16 h-16" src={image} alt={name} />
        <h1 className="mt-5 text-lg text-center font-semibold">{name}</h1>
        <div className="flex gap-2 mt-2 flex-wrap w-full justify-center">
          {types.map((type, ind) => (
            <div
              className={`${handleColor(
                type.type.name
              )} rounded-lg px-2 sm:px-2`}
              key={ind}
            >
              <p className="text-white mb-1">{type.type.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
