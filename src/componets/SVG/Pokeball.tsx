import React from "react";

interface PokeballProps {
  className?: string; // Optional className prop
}

const Pokeball: React.FC<PokeballProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={`w-40 h-40 ${className}`} // Default size with dynamic classes
      aria-label="Gray Pokéball"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        className="fill-gray-300 stroke-gray-400 stroke-2"
      />

      {/* Horizontal divider */}
      <rect x="2" y="47" width="96" height="6" className="fill-gray-400" />

      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="15"
        className="fill-gray-100 stroke-gray-400 stroke-2"
      />

      {/* Inner button */}
      <circle cx="50" cy="50" r="8" className="fill-gray-300" />
    </svg>
  );
};

export default Pokeball;
