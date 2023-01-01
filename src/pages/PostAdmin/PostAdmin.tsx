import React, { FC, useRef, useContext, useEffect, useState } from "react";
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
  Image,
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
import { Loader, MultiSelect, NativeSelect } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { TextField } from "@mui/joy";
import { apiDomain } from "../../utils";
import {
  FetchCategories,
  FetchPost,
  FetchTags,
  Post,
  UserPost,
} from "../../atoms";
import Error from "../../components/Error/Error";
import axios from "axios";
import EnhancedCategoryAdmin from "../EnhancedCategoryAdmin/EnhancedCategoryAdmin";
import { Form } from "react-bootstrap";

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
  deleteButton?: HTMLButtonElement;
  previewButton?: HTMLButtonElement;
  handleEditPost?: any;
}

const PostAdmin: FC<Props> = ({
  post,
  deleteButton,
  previewButton,
  handleEditPost,
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const tagRef = useRef(null);
  const captionRef = useRef(null);
  const updatedAtRef = useRef(null);
  const createdAtRef = useRef(null);
  const imageRef = useRef(null);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    value: categoriesValue,
  }: FetchCategories = useFetch(`${apiDomain()}/categories`);

  const {
    loading: tagsLoading,
    error: tagsError,
    value: tagsValue,
  }: FetchTags = useFetch(`${apiDomain()}/tags`);

  if (categoriesLoading || tagsLoading) {
    return <Loader size={"xl"} />;
  }

  if (categoriesError) {
    return <Error error={categoriesError} />;
  }

  if (tagsError) {
    <Error error={tagsError} />;
  }

  const categories = categoriesValue!.categories.map((category) => {
    return {
      _id: category._id,
      value: category.name,
      label: category.name,
    };
  });

  const tags = tagsValue!.tags.map((tag) => {
    return {
      _id: tag._id,
      value: tag.name,
      label: tag.name,
    };
  });

  const currentCategory = categoriesValue!.categories.find(
    (category) => category._id === post?.category
  )?.name;

  const currentTags = tagsValue!.tags
    .filter((tag) => post?.tags.includes(tag._id))
    .map((tag) => tag.name);

  const handleCreatePost = async (values: any) => {
    console.log(values.values());
    try {
      const { data } = await axios.post(`${apiDomain()}/posts`, values);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log(event.currentTarget.elements);

    const {
      title,
      createdAt,
      updatedAt,
      image,
      category,
      caption,
      tags: userTags,
    } = event.currentTarget.elements;

    const categoryId = categories.find(
      (element) => element.value === category.value
    )._id;

    const filteredTags = tags.filter((element) =>
      userTags.value.split(",").includes(element.value)
    );

    const tagIds = filteredTags.map((element) => element._id);

    console.log(tagIds);

    console.log(image.files[0]);

    // const post = {
    //   title: title.value,
    //   createdAt: new Date(createdAt.value),
    //   updatedAt: new Date(updatedAt.value),
    //   contentHtml: editorRef.current?.getContent(),
    //   published: event.nativeEvent.submitter.name,
    //   caption: caption.value,
    //   image: image.files[0],
    //   category: categoryId,
    //   tags: tagIds,
    // };

    const post = new FormData();
    post.append("title", title.value);
    post.append("createdAt", new Date(createdAt.value));
    post.append("updatedAt", new Date(updatedAt.value));
    post.append("contentHtml", editorRef.current?.getContent());
    post.append("published", event.nativeEvent.submitter.name);
    post.append("caption", caption.value);
    post.append("category", categoryId);
    post.append("tags", tagIds);
    post.append("image", image.files[0]);

    // for (const value of post.values()) {
    //   console.log(value)
    // }

    if (handleEditPost) {
      handleEditPost(post);
    } else {
      handleCreatePost(post);
    }
  };

  console.log(post);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data" >
      <Stack direction="row" marginBottom={40} alignItems={"center"}>
        <TextField
          size="lg"
          placeholder="Post Title"
          name="title"
          sx={{ width: "100%" }}
          ref={titleRef}
          defaultValue={post?.title}
        />
        <Box>{previewButton}</Box>
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
            <MenuItem name="published" type="submit">
              Save as published
            </MenuItem>
            <MenuItem name="unpublished" type="submit">
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
              name="contentHtml"
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
          <Box
            bg="#f7fafc"
            paddingX={"1rem"}
            paddingY={"1rem"}
            width={"92%"}
            margin={"2rem auto"}
          >
            <Text color="#5897e7" textAlign={"start"}>
              Image
            </Text>
            <Stack direction="row">
              {/* <Text
                color="#78879c"
                whiteSpace={"nowrap"}
                paddingRight={"1rem"}
                margin={"auto"}
              >
                Existing Image*
              </Text> */}
             {post?.image && <Image
                src={`${apiDomain()}/images/${post?.image.filename}`}
                crossOrigin="anonymous"
                boxSize="100%"
                objectFit={"cover"}
                marginBottom={"2rem"}
              />}
            </Stack>
            <Stack direction="row">
              <Text
                color="#78879c"
                whiteSpace={"nowrap"}
                paddingRight={"1rem"}
                margin={"auto"}
              >
                Upload image*
              </Text>
              <Form.Control type="file" ref={imageRef} name="image" />
            </Stack>
            <Stack direction="row" marginTop={"1rem"}>
              <Text
                color="#78879c"
                whiteSpace={"nowrap"}
                margin={"auto"}
                paddingRight={"1rem"}
              >
                Caption
              </Text>
              <Form.Control
                ref={captionRef}
                name="caption"
                defaultValue={post?.caption}
              />
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <DatePicker
              placeholder="Pick date"
              label="Post creation date"
              withAsterisk
              ref={createdAtRef}
              name="createdAt"
              defaultValue={
                post?.createdAt ? new Date(post.createdAt) : new Date()
              }
            />
            <DatePicker
              placeholder="Pick date"
              label="Post update date"
              withAsterisk
              ref={updatedAtRef}
              name="updatedAt"
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
            <NativeSelect
              data={categories}
              defaultValue={currentCategory}
              label="Category"
              placeholder="Pick relevant categories"
              withAsterisk
              name="category"
              ref={categoryRef}
            />
            <MultiSelect
              data={tags}
              label="Tags"
              placeholder="Pick relevant tags"
              mt={"1rem"}
              withAsterisk
              name="tags"
              defaultValue={currentTags}
              ref={tagRef}
            />
            {deleteButton}
          </Box>
        </GridItem>
      </Grid>
    </Form>
  );
};

export default PostAdmin;
