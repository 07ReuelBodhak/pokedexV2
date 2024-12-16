import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { change } from "../../features/state";
import Icon1 from "../SVG/Icon1";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const currentOption = useSelector((state: RootState) => state.navbar.option);

  const handleOptionChange = (newOption: string) => {
    dispatch(change(newOption));
  };

  return (
    <>
      <div className="bg-white transition-all gap-5 md:gap-7 md:px-12 lg:px-14 lg:gap-10 duration-150 flex px-5 sm:px-9 rounded-xl shadow-lg z-10 w-full h-[65px] sm:h-[70px]">
        <button
          onClick={() => handleOptionChange("home")}
          className={`${
            currentOption === "home" ? "border-red-500 border-b-2" : ""
          } flex hover:opacity-60 transition-opacity duration-150 flex-row sm:gap-2 px-2  items-center`}
        >
          {" "}
          <Icon1
            fillColor={`${currentOption === "home" ? "red" : "gray"}`}
            className="h-7 w-12 sm:h-9"
          />
          <p
            className={`${
              currentOption === "home" ? "text-red-500" : "text-gray-500"
            } font-bold text-md sm:text-lg `}
          >
            Pokedex
          </p>
        </button>
        <button
          onClick={() => handleOptionChange("about")}
          className={`${
            currentOption === "about" ? "border-b-2 border-red-500" : ""
          } flex hover:opacity-60 transition-all duration-150 flex-row sm:gap-2 px-1  items-center`}
        >
          <Icon1
            fillColor={`${currentOption === "about" ? "red" : "gray"}`}
            className="h-7 w-12 sm:h-9"
          />
          <p
            className={`${
              currentOption === "about" ? "text-red-500" : "text-gray-500"
            } font-bold text-md sm:text-lg `}
          >
            About
          </p>
        </button>
      </div>
    </>
  );
};

export default Navbar;
