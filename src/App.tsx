import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavigationBar/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
