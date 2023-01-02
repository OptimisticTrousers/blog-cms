import { Box, Button, Heading } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import { FC, FormEvent } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserCategory, CategoryAdminProps } from "../../atoms";
import { apiDomain } from "../../utils";

const CategoriesAdmin: FC<CategoryAdminProps> = ({
  category,
  deleteButton,
  handleEditCategory,
}) => {
  const navigate = useNavigate();

  const handleCreateCategory = async (values: UserCategory) => {
    try {
      const {
        data: { category },
      } = await axios.post(`${apiDomain()}/categories`, values);
      navigate(`/categories/${category._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameElement = event.currentTarget.elements.namedItem(
      "name"
    ) as HTMLInputElement;

    const category = { name: nameElement.value };

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
        defaultValue={category && category.name}
        name="name"
        required
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
      <Box>{deleteButton}</Box>
    </Form>
  );
};

export default CategoriesAdmin;
