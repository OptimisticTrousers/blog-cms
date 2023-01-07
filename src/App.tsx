import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import { apiDomain } from "./utils";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";

const App = () => {
  const { loading, error, value } = useFetch(`${apiDomain()}/user`, {
    credentials: "include",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading && value) {
  //     navigate("/login");
  //   }
  // }, [value]);

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
