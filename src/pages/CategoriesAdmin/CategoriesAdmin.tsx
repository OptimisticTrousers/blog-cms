import { Box, Button, Heading } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import { FC, FormEvent, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { Category, UserCategory, UserTag } from "../../atoms";
import { apiDomain } from "../../utils";

interface handleEditFn {
  (values: UserTag): Promise<void>;
}
interface Props {
  category?: Category;
  deleteButton?: ReactNode;
  handleEditCategory?: handleEditFn;
}

const CategoriesAdmin: FC<Props> = ({
  category,
  deleteButton,
  handleEditCategory,
}) => {
  const handleCreateCategory = async (values: UserCategory) => {
    try {
      const { data } = await axios.post(`${apiDomain()}/categories`, values);
      console.log(data);
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
