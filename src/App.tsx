import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { apiDomain } from "./utils";
import { Navigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import Error from "./components/Error/Error";
import { createContext } from "react";
import { Auth, FetchUser, User } from "./atoms";

export const AuthContext = createContext<Auth>({ user: null });

const App = () => {
  const { loading, error, value }: FetchUser = useFetch(`${apiDomain()}/user`, {
    credentials: "include",
  });

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const user: User | null = value!["user"];

  return (
    <AuthContext.Provider value={{ user }}>
      <NavigationBar />
      <main>{user ? <Outlet /> : <Navigate to="login" />}</main>
    </AuthContext.Provider>
  );
};

export default App;
