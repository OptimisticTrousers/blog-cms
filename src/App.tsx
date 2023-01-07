import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { apiDomain } from "./utils";
import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import Error from "./components/Error/Error";

const App = () => {
  const { loading, error, value } = useFetch(`${apiDomain()}/user`, {
    credentials: "include",
  });

  console.log(value)
  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (loading === false) {
    return (
      <>
        <NavigationBar />
        <main>{value.user ? <Outlet /> : <Navigate to="login" />}</main>
      </>
    );
  }
};

export default App;
