import { Box, Heading, Stack } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import { FC, FormEvent, ReactNode } from "react";
import { Tag, UserTag } from "../../atoms";
import { apiDomain } from "../../utils";
import { Button } from "@chakra-ui/react";
import { Form } from "react-bootstrap";

interface handleEditFn {
  (values: UserTag): Promise<void>;
}
interface Props {
  tag?: Tag;
  deleteButton?: ReactNode;
  handleEditTag?: handleEditFn;
}

const TagAdmin: FC<Props> = ({ tag, deleteButton, handleEditTag }) => {
  const handleCreateTag = async (values: UserTag) => {
    try {
      const { data } = await axios.post(`${apiDomain()}/tags`, values);
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

    const tag = { name: nameElement.value };

    if (handleEditTag) {
      handleEditTag(tag);
    } else {
      handleCreateTag(tag);
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
