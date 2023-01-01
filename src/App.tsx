import reactLogo from "./assets/react.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
