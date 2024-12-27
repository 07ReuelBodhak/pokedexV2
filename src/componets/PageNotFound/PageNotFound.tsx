import Pokeball from "../SVG/Pokeball";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <Pokeball />
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
      </div>
      <p className="text-xl mt-4 text-gray-600 max-w-md text-center">
        Oops! This Pokémon seems to have escaped from our Pokédex!
      </p>
    </div>
  );
}
