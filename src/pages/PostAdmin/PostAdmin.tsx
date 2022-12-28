import React, { useRef } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import {
  ViewIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Autocomplete from "@mui/joy/Autocomplete";
import { Loader, MultiSelect } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { TextField } from "@mui/joy";
import { apiDomain } from "../../utils";
import { FetchPost } from "../../atoms";
import Error from "../../components/Error/Error";

const data = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];

const PostAdmin = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const { postId } = useParams();

  const { loading, error, value }: FetchPost = useFetch(
    `${apiDomain()}/${postId}`
  );

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error}/>;
  }

  const { title, published, contentHtml, updatedAt, createdAt } = value!.posts;

  const renderedComments = value!.comments.map((comment) => {
    return (
      <Box
        padding={"1rem"}
        marginBottom={"2rem"}
        borderBottom={"1px solid black"}
      >
        <Comment key={comment._id} {...comment} />
        <Button
          colorScheme="cyan"
          width="100%"
          borderRadius={8}
          leftIcon={<EditIcon />}
          marginTop={"1rem"}
        >
          Edit Comment
        </Button>
        <Button
          colorScheme={"red"}
          leftIcon={<DeleteIcon />}
          width="100%"
          borderRadius={8}
          marginTop={"1rem"}
        >
          Delete
        </Button>
      </Box>
    );
  });

  return (
    <Box>
      <Stack direction="row" marginBottom={40}>
        <TextField size="lg" placeholder="Post Title" sx={{ width: "100%" }} />
        <Link to={`/posts/${postId}/preview`} target="_blank">
          <Button leftIcon={<ViewIcon />}>Preview</Button>
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor="#3f87e5"
            color="white"
            borderRadius={8}
          >
            Save
          </MenuButton>
          <MenuList>
            <MenuItem>Save as published</MenuItem>
            <MenuItem>Save as unpublished</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
      <Grid templateColumns="3fr 1fr" gap={24}>
        <GridItem
          bg="white"
          boxShadow="md"
          p="6"
          rounded="md"
          borderRadius={"8px"}
          border={"2px solid #ecf0f5"}
        >
          <Heading
            as="h2"
            size="md"
            textAlign={"start"}
            color="#5897e7"
            padding={"1rem"}
          >
            Content
          </Heading>
          <Box
            bg="#f7fafc"
            paddingX={"1rem"}
            paddingY={"1rem"}
            width={"92%"}
            margin={"0 auto"}
          >
            <Text color="#5897e7" textAlign={"start"}>
              Text
            </Text>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              apiKey={import.meta.env.TINY_API_KEY}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Box>
          {/* <Box
            bg="#f7fafc"
            paddingX={"1rem"}
            paddingY={"1rem"}
            width={"92%"}
            margin={"2rem auto"}
          >
            <Text color="#5897e7" textAlign={"start"}>
              Image
            </Text>
          </Box> */}
          <Box
            bg="#f7fafc"
            paddingX={"1rem"}
            paddingY={"1rem"}
            width={"92%"}
            margin={"2rem auto"}
          >
            <Text color="#5897e7" textAlign={"start"}>
              Comments
            </Text>
            {renderedComments?.length ? (
              renderedComments
            ) : (
              <h3>No comments yet...</h3>
            )}
          </Box>
        </GridItem>
        <GridItem>
          <DatePicker
            placeholder="Pick date"
            label="Post creation date"
            withAsterisk
          />
          <Text fontSize={"1rem"} textAlign={"start"} marginTop={"1rem"}>
            <Text as="b">Status: </Text>
            Published
          </Text>
          <Box>
            <MultiSelect
              data={data}
              label="Categories"
              placeholder="Pick relevant categories"
            />
          </Box>
          <Box marginTop={"1rem"}>
            <MultiSelect
              data={data}
              label="Tags"
              placeholder="Pick relevant tags"
            />
          </Box>
          <Button
            colorScheme={"red"}
            leftIcon={<DeleteIcon />}
            width="100%"
            borderRadius={8}
            marginTop={"1rem"}
          >
            Delete
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostAdmin;
