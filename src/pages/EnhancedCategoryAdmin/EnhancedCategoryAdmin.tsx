import { DeleteIcon } from "@chakra-ui/icons";
import { Grid, Heading, Stack } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchCategory, Post, UserCategory } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import CategoryAdmin from "../CategoriesAdmin/CategoriesAdmin";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import PostCard from "../../components/PostCard/PostCard";
import { Button } from "@mui/material";
import { borderRadius } from "@mui/system";

const withCategoryEditing = (WrappedComponent: any) => {
  return () => {
    const { categoryId } = useParams();

    const navigate = useNavigate();

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
        navigate(`/categories/${data._id}`);
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
        navigate("/categories");
      } catch (err) {
        console.log(err);
      }
    };

    const deleteButton = (
      <Button
        variant="contained"
        color="warning"
        sx={{
          width: "100%",
          marginTop: "1rem",
          paddingTop: "0.6rem",
          paddingBottom: "0.6rem",
          textDecoration: "none",
          borderRadius: "8px",
        }}
        onClick={() => setShow(true)}
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
