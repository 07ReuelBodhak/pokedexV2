import React from "react";
interface classProps {
  className: string;
}

const PokeballSpinner: React.FC<classProps> = ({ className }) => {
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={className}
      >
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="white"
          stroke="black"
          strokeWidth="5"
        />
        {/* Top Half */}
        <path
          d="M5 50a45 45 0 0 1 90 0H5z"
          fill="red"
          stroke="black"
          strokeWidth="5"
        />
        {/* Center Circle */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="white"
          stroke="black"
          strokeWidth="5"
        />
        <circle cx="50" cy="50" r="5" fill="black" />
      </svg>
    </div>
  );
};

export default PokeballSpinner;
