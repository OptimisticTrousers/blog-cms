import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Grid, Heading, Stack } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FetchCategory, Post, UserCategory } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import CategoryAdmin from "../CategoriesAdmin/CategoriesAdmin";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import PostCard from "../../components/PostCard/PostCard";

const withCategoryEditing = (WrappedComponent: any) => {
  return () => {
    const { categoryId } = useParams();

    const [show, setShow] = useState(false);

    const { loading, error, value }: FetchCategory = useFetch(
      `${apiDomain()}/categories/${categoryId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const category = value!.category;
    const posts = value!.posts;

    const handleEditCategory = async (values: UserCategory) => {
      try {
        const { data } = await axios.put(
          `${apiDomain()}/categories/${categoryId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      try {
        const { data } = await axios.delete(
          `${apiDomain()}/categories/${categoryId}`
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteButton = (
      <Button
        colorScheme={"red"}
        leftIcon={<DeleteIcon />}
        width="100%"
        borderRadius={8}
        onClick={() => setShow(true)}
        marginTop={"1rem"}
      >
        Delete
      </Button>
    );

    return (
      <>
        <WrappedComponent
          category={value!.category}
          deleteButton={deleteButton}
          handleEditCategory={handleEditCategory}
        />{" "}
        <Stack>
          <Heading size={"xl"} textAlign={"center"} marginTop={"1rem"}>
            Posts associated with: {category.name}
          </Heading>
          <Grid
            templateColumns={"repeat(auto-fit, 300px)"}
            gap={32}
            justifyContent={"center"}
          >
            {posts.map((post: Post) => {
              return <PostCard {...post} />;
            })}
          </Grid>
        </Stack>
        <DeleteModal
          handleDelete={handleDelete}
          show={show}
          setShow={setShow}
          data={category}
        />
      </>
    );
  };
};

export default withCategoryEditing(CategoryAdmin);
