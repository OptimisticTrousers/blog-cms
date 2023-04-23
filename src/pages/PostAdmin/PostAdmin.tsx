import { FC, useRef, FormEvent, useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import useFetch from "../../hooks/useFetch";
import { Loader, MultiSelect, NativeSelect } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { TextField } from "@mui/joy";
import { FetchCategories, FetchTags, PostAdminProps } from "../../atoms";
import Error from "../../components/Error/Error";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const PostAdmin: FC<PostAdminProps> = ({
  post,
  deleteButton,
  previewButton,
  handleEditPost,
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    value: categoriesValue,
  }: FetchCategories = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/categories`
  );

  const {
    loading: tagsLoading,
    error: tagsError,
    value: tagsValue,
  }: FetchTags = useFetch(`${import.meta.env.VITE_API_DOMAIN}/tags`);

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
    .filter((tag) => !post?.tags.includes(tag._id))
    .map((tag) => tag.name);

  const handleCreatePost = async (values: FormData) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    try {
      const {
        data: { post },
      } = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/posts`, values);
      navigate(`/posts/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log("locos");
    event.preventDefault();

    const titleElement = event.currentTarget.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const createdAtElement = event.currentTarget.elements.namedItem(
      "createdAt"
    ) as HTMLInputElement;
    const updatedAtElement = event.currentTarget.elements.namedItem(
      "updatedAt"
    ) as HTMLInputElement;
    const imageElement = event.currentTarget.elements.namedItem(
      "image"
    ) as HTMLInputElement;
    const categoryElement = event.currentTarget.elements.namedItem(
      "category"
    ) as HTMLSelectElement;
    const captionElement = event.currentTarget.elements.namedItem(
      "caption"
    ) as HTMLInputElement;
    const tagsElement = event.currentTarget.elements.namedItem(
      "tags"
    ) as HTMLSelectElement;

    if (!editorRef.current?.getContent()) {
      alert("Please enter content");
      return;
    }

    const categoryId = categories.find(
      (element) => element.value === categoryElement.value
    )?._id;

    const filteredTags = tags.filter((element) =>
      tagsElement.value.split(",").includes(element.value)
    );

    const tagIds = filteredTags.map((element) => element._id);

    const nativeEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement;
    const published = submitter.name === "published" ? true : false;

    const userPost = new FormData();
    userPost.append("title", titleElement.value);
    userPost.append("createdAt", new Date(createdAtElement.value).toString());
    userPost.append("updatedAt", new Date(updatedAtElement.value).toString());
    userPost.append("contentHtml", editorRef.current?.getContent()!);
    userPost.append("published", published.toString());
    userPost.append("caption", captionElement.value);
    userPost.append("category", categoryId!);
    userPost.append("tags", tagIds.toString());
    if (imageElement?.files?.[0]) {
      userPost.append("image", imageElement.files[0]);
    }

    if (handleEditPost) {
      handleEditPost(userPost);
    } else {
      handleCreatePost(userPost);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Stack direction="row" marginBottom={40} alignItems={"center"}>
        <TextField
          size="lg"
          placeholder="Post Title"
          name="title"
          sx={{ width: "100%" }}
          defaultValue={post?.title}
          required
        />
        <Box>{previewButton}</Box>
        <Box>
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
        </Box>
      </Stack>
      <Grid
        templateColumns="3fr 1fr"
        gap={24}
        sx={{
          "@media(max-width: 720px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
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
              apiKey={import.meta.env.VITE_TINY_API_KEY}
              initialValue={post?.contentHtml ?? "<p>Bob Jones is great!</p>"}
              init={{
                height: 500,
                menubar: false,
                plugins:
                  "preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",

                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",

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
              {post?.image && (
                <Image
                  src={`${import.meta.env.VITE_S3_BUCKET}/${
                    post?.image.originalname
                  }`}
                  crossOrigin="anonymous"
                  boxSize="100%"
                  objectFit={"cover"}
                  marginBottom={"2rem"}
                />
              )}
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
              <Form.Control type="file" name="image" />
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
              <Form.Control name="caption" defaultValue={post?.caption} />
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <Heading size={"xl"} textAlign={"center"}>
            Attributes
          </Heading>
          <Box marginTop={"3rem"}>
            <DatePicker
              placeholder="Pick date"
              label="Post creation date"
              withAsterisk
              name="createdAt"
              defaultValue={
                post?.createdAt ? new Date(post.createdAt) : new Date()
              }
              required
            />
            <DatePicker
              placeholder="Pick date"
              label="Post update date"
              withAsterisk
              name="updatedAt"
              defaultValue={
                post?.updatedAt ? new Date(post.updatedAt) : new Date()
              }
              required
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
              required
            />
            <MultiSelect
              data={tags}
              label="Tags"
              placeholder="Pick relevant tags"
              mt={"1rem"}
              withAsterisk
              name="tags"
              defaultValue={currentTags}
              required
            />
            {deleteButton}
          </Box>
        </GridItem>
      </Grid>
    </Form>
  );
};

export default PostAdmin;
