import "./App.css";
import Navbar from "./componets/Navbar/Navbar";
import Pokeball from "./componets/SVG/Pokeball";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect, useRef, useState } from "react";
import Home from "./componets/Home/Home";
import About from "./componets/About/About";
import PageNotFound from "./componets/PageNotFound/PageNotFound";

const App = () => {
  const currentOption = useSelector((state: RootState) => state.App.nav.option);
  const navigate = useNavigate();

  const [offset, setOffset] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [bottomReached, setBottomReached] = useState<boolean>(true);
  const [isScrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    navigate(currentOption);
  }, [currentOption, navigate]);

  const handleScroll = () => {
    if (mainRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
      const newScrollPosition = Math.floor(scrollTop + clientHeight);

      if (scrollTop === 0) {
        setScrolling(false);
      }

      if (scrollPosition === 0 && newScrollPosition > 1) {
        setScrollPosition(newScrollPosition);
        return;
      }

      if (newScrollPosition > scrollPosition + 150) {
        setScrolling(true);
      }
      if (newScrollPosition >= scrollHeight - 3) {
        if (bottomReached !== true) {
          setBottomReached(true);
        }
      }
    }
  };

  return (
    <>
      <Pokeball className="opacity-15 fixed scale-[1.4] sm:scale-[2.3] sm:translate-y-5 sm:translate-x-4 md:scale-[2.5] rotate-45" />
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="home overflow-auto scroll-smooth h-screen flex flex-col gap-2 px-8 py-2 sm:px-12 sm:py-4 md:px-14 md:py-8 w-full bg-gray-50"
      >
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                mainRef={mainRef}
                isScrolling={isScrolling}
                offset={offset}
                setOffset={setOffset}
                setBottomReached={setBottomReached}
                bottomReached={bottomReached}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
