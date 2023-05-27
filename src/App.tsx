import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import Error from "./components/Error/Error";
import { createContext } from "react";
import { Auth, FetchUser, User } from "./atoms";
import LoadingScreen from "./pages/LoadingScreen";

export const AuthContext = createContext<Auth>({ isAuthenticated: false });

const App = () => {
  const { loading, error, value }: FetchUser = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/user`,
    {
      credentials: "include",
    }
  );

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const user: User | null = value!["user"];

  let isAuthenticated = false;

  if (user) {
    isAuthenticated = true;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <LoadingScreen />
      <NavigationBar />
      <main>{user ? <Outlet /> : <Navigate to="login" />}</main>
    </AuthContext.Provider>
  );
};

export default App;
