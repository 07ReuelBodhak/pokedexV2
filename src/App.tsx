import "./App.css";
import Navbar from "./componets/Navbar/Navbar";
import Pokeball from "./componets/SVG/Pokeball";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";
import Home from "./componets/Home/Home";

const App = () => {
  const currentOption = useSelector((state: RootState) => state.navbar.option);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(currentOption);
  }, [currentOption, navigate]);

  return (
    <>
      <Pokeball className="opacity-15 fixed scale-[1.4] sm:scale-[2.3] sm:translate-y-5 sm:translate-x-4 md:scale-[2.5]  rotate-45" />
      <main className="h-screen flex flex-col gap-4 sm:gap-7 px-8 py-8 sm:px-12 sm:py-8 md:px-14 md:py-10 w-full bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<h1>hello</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
