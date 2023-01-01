import { Box, Heading } from "@chakra-ui/react";
import { TextField } from "@mui/joy";
import axios from "axios";
import { FC, FormEvent, useRef } from "react";
import { Tag, UserTag } from "../../atoms";
import { apiDomain } from "../../utils";
import { Button } from "@chakra-ui/react";
import { Form } from "react-bootstrap";

interface handleEditFn {
  (values: Tag): Promise<void>;
}
interface Props {
  tag?: Tag;
  deleteButton?: HTMLButtonElement;
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

    const { name } = event.currentTarget.elements;

    const tag = { name };

    if (handleEditTag) {
      handleEditTag(tag);
    } else {
      handleCreateTag(tag);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box>
        <Heading size={"xl"} textAlign={"center"}>
          {tag ? `Update tag: ${tag._id}` : "Create a New Tag"}
        </Heading>
        <TextField
          size="lg"
          placeholder="Tag Title"
          sx={{ width: "100%", marginTop: "1rem" }}
          defaultValue={tag && tag.name}
          name="name"
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
      </Box>
    </Form>
  );
};

export default TagAdmin;
