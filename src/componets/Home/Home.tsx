import React, { useState } from "react";
import Icon3 from "../SVG/Icon3";

const Home: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [pokemonName, setIsPokemonName] = useState("");
  const handleSearch = () => {
    //comment
    alert("search is successfull");
  };
  return (
    <div className="flex py-4 flex-col md:flex-row">
      <div className="flex-1 p-4">
        <div className="relative flex w-full">
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
      </div>
      <div className="hidden md:block md:w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold text-center">
          Right Side Extra Div
        </h2>
        <p className="text-center mt-2">This appears on md and lg screens.</p>
      </div>
    </div>
  );
};

export default Home;
