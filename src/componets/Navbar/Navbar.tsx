import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { change } from "../../features/state";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const currentOption = useSelector((state: RootState) => state.navbar.option);

  const handleOptionChange = (newOption: string) => {
    dispatch(change(newOption));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg z-10 w-full h-[65px] sm:h-[75px] md:h-[80px]"></div>
    </>
  );
};

export default Navbar;
