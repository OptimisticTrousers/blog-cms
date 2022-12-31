import { Box, MenuButton, Heading } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import React, { FC, useRef } from "react";
import CSSModules from "react-css-modules";
import { Tag, UserTag } from "../../atoms";
import { apiDomain } from "../../utils";
import styles from "./TagAdmin.module.css";
import { Button } from "@chakra-ui/react";
import { Form } from "react-bootstrap";

interface Props {
  tag?: Tag;
  deleteButton?: any;
  handleEditTag?: any;
}

const TagAdmin: FC<Props> = ({ tag, deleteButton, handleEditTag }) => {
  const nameRef = useRef(null);

  const handleCreateTag = async (values: UserTag) => {
    try {
      const { data } = await axios.post(`${apiDomain()}/tags`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.children[0].children[0].value;

    const tag = { name };

    if (handleEditTag) {
      handleEditTag(tag);
    } else {
      handleCreateTag(tag);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size={"xl"} textAlign={"center"}>
        Create a New Tag!
      </Heading>
      <TextField
        size="lg"
        placeholder="Tag Title"
        sx={{ width: "100%", marginTop: "1rem" }}
        ref={nameRef}
      />
      <Button
        color="white"
        bgColor="#3f87e5"
        borderRadius={8}
        width={"100%"}
        marginTop={"1rem"}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default CSSModules(TagAdmin, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
