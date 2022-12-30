import React, { FC, useRef, useContext, useEffect } from "react";
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
import { FetchPost, Post, UserPost } from "../../atoms";
import Error from "../../components/Error/Error";
import axios from "axios";

const data = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];

interface Props {
  post?: Post;
  renderedComments?: JSX.Element[];
  deleteButton?: HTMLButtonElement;
  previewButton?: HTMLButtonElement;
  handleEditPost?: any;
}

const PostAdmin: FC<Props> = ({
  post,
  renderedComments,
  deleteButton,
  previewButton,
  handleEditPost,
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const titleRef = useRef(null);
  const updatedAtRef = useRef(null);
  const createdAtRef = useRef(null);

  // Form information

  const handleCreatePost = async (values: UserPost) => {
    try {
      const { data } = await axios.post(`${apiDomain()}/posts`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (published: boolean) => {
    const title = titleRef.current.children[0].children[0].value;
    const contentHtml = editorRef.current.getContent();
    const createdAt = createdAtRef.current.value;
    const updatedAt = updatedAtRef.current.value;
    const post = {
      title,
      published,
      contentHtml,
      createdAt,
      updatedAt,
    };

    if (handleEditPost) {
      handleEditPost(post);
    } else {
      handleCreatePost(post);
    }
  };

  return (
    <Box>
      <Stack direction="row" marginBottom={40}>
        <TextField
          size="lg"
          placeholder="Post Title"
          sx={{ width: "100%" }}
          ref={titleRef}
          defaultValue={post?.title}
        />
        {previewButton}
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
            <MenuItem onClick={() => handleSubmit(true)}>
              Save as published
            </MenuItem>
            <MenuItem onClick={() => handleSubmit(false)}>
              Save as unpublished
            </MenuItem>
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
              initialValue={post?.contentHtml ?? "<p>Bob Jones is great!</p>"}
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
          {renderedComments && (
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
              {renderedComments.length ? (
                renderedComments
              ) : (
                <h3>No comments yet...</h3>
              )}
            </Box>
          )}
        </GridItem>
        <GridItem>
          <DatePicker
            placeholder="Pick date"
            label="Post creation date"
            withAsterisk
            ref={createdAtRef}
            defaultValue={
              post?.createdAt ? new Date(post.createdAt) : new Date()
            }
          />
          <DatePicker
            placeholder="Pick date"
            label="Post update date"
            withAsterisk
            ref={updatedAtRef}
            defaultValue={
              post?.updatedAt ? new Date(post.updatedAt) : new Date()
            }
            mt={12}
          />
          <Text fontSize={"1rem"} textAlign={"start"} marginTop={"1rem"}>
            <Text as="b">Status: </Text>
            {post?.published === true
              ? "PUBLISHED"
              : post?.published === false
              ? "UNPUBLISHED"
              : "NOT CREATED"}
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
          {deleteButton}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostAdmin;
