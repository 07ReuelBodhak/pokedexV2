import React from "react";

interface IconProps {
  fillColor: string;
  className?: string;
}

const Icon2: React.FC<IconProps> = ({ fillColor, className }) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 48 48"
    id="b"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <style>
        {`.c,.d{fill:none;stroke:${fillColor};stroke-width:2}.d{stroke-linecap:round;stroke-linejoin:round;}`}
      </style>
    </defs>
    <g>
      <path
        className="d"
        d="m25.5,5.5H14.5c-4.9706,0-9,4.0294-9,9v19c0,4.9706,4.0294,9,9,9h19c4.9706,0,9-4.0294,9-9V14.5c0-4.9706-4.0294-9-9-9Z"
      />
      <circle className="d" cx="14.3839" cy="19.2723" r="7.55" />
      <circle className="d" cx="14.4839" cy="19.3723" r="4" />
    </g>
    <path
      className="c"
      d="m42.1997,22.64h-12.7056s-2.605-.4277-5.5987,3.3826l-2.024,2.642c-2.9938,3.8102-5.5987,3.3826-5.5987,3.3826H5.5"
    />
  </svg>
);

export default Icon2;
