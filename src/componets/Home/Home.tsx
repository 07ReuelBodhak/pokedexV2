import React, { useEffect, useState } from "react";
import Icon3 from "../SVG/Icon3";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "./app";
import { RootState, AppDispatch } from "../../store";
import Card from "../Card/Card";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonDetails = useSelector(
    (state: RootState) => state.App.pokemon_details.data
  );
  useEffect(() => {
    if (pokemonDetails.length == 0) {
      console.log("fetching pokemon");
      dispatch(fetchPokemon());
    }
  }, [pokemonDetails, dispatch]);

  pokemonDetails.forEach((pokemon) => {
    // console.log(pokemon.description);
  });
  const [isFocused, setIsFocused] = useState(false);
  const [pokemonName, setIsPokemonName] = useState("");
  const handleSearch = () => {
    alert("search is successfull");
  };
  return (
    <div className="flex py-4 flex-col md:flex-row">
      <div className="flex flex-col md:w-3/4 w-full gap-5 p-4">
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
        <div className="grid mt-4 grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
          {pokemonDetails.map((pokemon, id) => (
            <Card
              key={id}
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
      <div className="hidden rounded-xl md:block md:w-1/3 sticky top-4 h-[600px] bg-white p-4">
        <h2 className="text-xl font-semibold text-center">
          Right Side Extra Div
        </h2>
        <p className="text-center mt-2">This appears on md and lg screens.</p>
      </div>
    </div>
  );
};

export default Home;
