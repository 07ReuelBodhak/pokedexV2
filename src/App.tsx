import "./App.css";
import Navbar from "./componets/Navbar/Navbar";
import Pokeball from "./componets/SVG/Pokeball";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Pokeball className="opacity-15 fixed scale-[1.4] sm:scale-[2.3] sm:translate-y-5 sm:translate-x-4 md:scale-[2.5]  rotate-45" />
      <main className="h-screen flex px-8 py-8 sm:px-12 sm:py-8 md:px-14 md:py-10 w-full bg-slant-200">
        <Navbar />
      </main>
    </Provider>
  );
};

export default App;
