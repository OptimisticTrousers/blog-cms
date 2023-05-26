import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import {
  FormControl,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  ChakraProvider,
  FormLabel,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import Error from "../../components/Error/Error";
import { FetchUser } from "../../atoms";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow((prevShow) => !prevShow);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { loading, error, value }: FetchUser = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/user`,
    {
      credentials: "include",
    }
  );

  useEffect(() => {
    if (value && value["user"]) {
      navigate("/");
    }
  }, [value]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Loader size={"xl"} />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!usernameRef.current || !passwordRef.current) {
        alert("Please enter a valid username and password");
        return;
      }

      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/login`,
        user,
        {
          withCredentials: true,
        }
      );
      if (data === "Successfully Authenticated") {
        navigate("/");
      } else {
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        alert("Please try again");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "32px",
          height: "100vh",
        }}
      >
        <Box>
          <Text
            align={{ base: "center", lg: "left" }}
            mt={{ base: "30px", lg: "8px" }}
            mb={{ base: "12px", lg: 0 }}
            color="#01b7ee"
            fontFamily="-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif"
            fontSize={{ base: "52px", lg: "60px" }}
            fontWeight={"bold"}
            letterSpacing={"-3px"}
            textAlign={"center"}
          >
            Blog CMS
          </Text>
          <Text
            align={{ base: "center", lg: "left" }}
            textAlign={"center"}
            maxW={{ base: "400px", lg: "500px" }}
            fontSize={{ base: "24px", lg: "28px" }}
            lineHeight={"1.14"}
          >
            Manage blogs that are shared with the world
          </Text>
        </Box>
        <Box
          backgroundColor={"white"}
          padding={"2rem"}
          boxShadow={"0px 0px 15px 5px rgba(0, 0, 0, 0.3)"}
          borderRadius={12}
        >
          <form onSubmit={handleSubmit}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              placeholder="Enter your username"
              size="md"
              mb={6}
              ref={usernameRef}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                ref={passwordRef}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme="blue" type="submit" mt={6}>
              Log In
            </Button>
          </form>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Login;
