import { Box, Heading, Stack } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import { FC, FormEvent, ReactNode, useContext } from "react";
import { Tag, TagAdminProps, UserTag } from "../../atoms";
import { Button } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

interface handleEditFn {
  (values: UserTag): Promise<void>;
}
interface Props {
  tag?: Tag;
  deleteButton?: ReactNode;
  handleEditTag?: handleEditFn;
}

const TagAdmin: FC<TagAdminProps> = ({ tag, deleteButton, handleEditTag }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleCreateTag = async (values: UserTag) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    try {
      const {
        data: { tag },
      } = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/tags`, values);
      navigate(`/tags/${tag._id.toString()}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameElement = event.currentTarget.elements.namedItem(
      "name"
    ) as HTMLInputElement;

    const userTag = { name: nameElement.value };

    if (handleEditTag) {
      handleEditTag(userTag);
    } else {
      handleCreateTag(userTag);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Heading size={"xl"} textAlign={"center"}>
          {tag ? `Update tag: ${tag._id}` : "Create a New Tag"}
        </Heading>
        <TextField
          size="lg"
          placeholder="Tag Title"
          sx={{ width: "100%", marginTop: "1rem" }}
          defaultValue={tag && tag.name}
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
          SAVE
        </Button>
        <Box>{deleteButton}</Box>
      </Stack>
    </Form>
  );
};

export default TagAdmin;
