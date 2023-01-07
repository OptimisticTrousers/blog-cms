import { Grid, Heading, Stack } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import { FunctionComponent, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchTag, Post, TagAdminProps, UserTag } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import TagAdmin from "../TagAdmin/TagAdmin";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import PostCard from "../../components/PostCard/PostCard";
import { Button } from "@mui/material";
import { AuthContext } from "../../App";

const withTagEditing = (WrappedComponent: FunctionComponent<TagAdminProps>) => {
  return () => {
    const { tagId } = useParams();

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const { loading, error, value }: FetchTag = useFetch(
      `${apiDomain()}/tags/${tagId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const tag = value!.tag;

    const posts = value!.posts;

    const handleEditTag = async (values: UserTag) => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      try {
        const { data } = await axios.put(
          `${apiDomain()}/tags/${tagId}`,
          values
        );
        console.log(data);
        navigate(`/tags/${data._id}`);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      try {
        const { data } = await axios.delete(`${apiDomain()}/tags/${tagId}`);
        console.log(data);
        navigate("/tags");
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
          tag={tag}
          deleteButton={deleteButton}
          handleEditTag={handleEditTag}
        />
        <Stack>
          <Heading size={"xl"} textAlign={"center"} marginTop={"1rem"}>
            {posts.length
              ? `Posts associated with: ${tag.name}`
              : `No posts associated with: ${tag.name}`}
          </Heading>
          <Grid
            templateColumns={"repeat(auto-fit, 350px)"}
            gap={32}
            justifyContent={"center"}
          >
            {posts.map((post: Post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Grid>
        </Stack>
        <DeleteModal
          show={show}
          setShow={setShow}
          handleDelete={handleDelete}
          data={tag}
        />
      </>
    );
  };
};

export default withTagEditing(TagAdmin);
