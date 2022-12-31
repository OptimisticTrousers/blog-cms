import { Box, MenuButton, Button, Heading } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import React, { FC, useRef } from "react";
import { Form } from "react-bootstrap";
import { Category, UserCategory } from "../../atoms";
import { apiDomain } from "../../utils";

interface Props {
  category?: Category;
  deleteButton?: HTMLButtonElement;
  handleEditCategory?: any;
}

const CategoriesAdmin: FC<Props> = ({
  category,
  deleteButton,
  handleEditCategory,
}) => {
  const nameRef = useRef<HTMLDivElement | null>(null);

  const handleCreateCategory = async (values: UserCategory) => {
    try {
      const { data } = await axios.post(`${apiDomain()}/categories`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    const name = nameRef.current.children[0].children[0].value;

    const category = { name };

    if (handleEditCategory) {
      handleEditCategory(category);
    } else {
      handleCreateCategory(category);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size={"xl"} textAlign={"center"}>
        {category
          ? `Update category: ${category._id}`
          : "Create a New Category"}
      </Heading>
      <TextField
        size="lg"
        placeholder="Category Title"
        sx={{ width: "100%", marginTop: "1rem" }}
        ref={nameRef}
        defaultValue={category && category.name}
      />
      <Button
        color="white"
        bgColor="#3f87e5"
        borderRadius={8}
        width={"100%"}
        marginTop={"1rem"}
        type="submit"
      >
        Save
      </Button>
    </Form>
  );
};

export default CategoriesAdmin;
