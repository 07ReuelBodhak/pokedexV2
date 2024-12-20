import React from "react";
import { pokemonTypeData } from "../../features/pokemonState";

interface CardProps {
  image: string;
  name: string;
  types: pokemonTypeData[];
}

const Card: React.FC<CardProps> = ({ name, image, types }) => {
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
        return "bg-gray-400";
      case "bug":
        return "bg-green-800";
      default:
        break;
    }
  };
  return (
    <>
      <div className="relative sm:cursor-pointer transition-all ease-out border-b-2 duration-200 hover:border-red-600 shadow-md h-36 flex justify-center md:w-48 lg:w-52 sm:w-40 items-center flex-col p-3 z-10 rounded-lg bg-white">
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
