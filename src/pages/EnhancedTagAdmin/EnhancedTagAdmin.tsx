import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Grid, Heading, Stack, useDisclosure, Wrap } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FetchTag, UserTag } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import TagAdmin from "../TagAdmin/TagAdmin";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import PostCard from "../../components/PostCard/PostCard";

const withTagEditing = (WrappedComponent: any) => {
  return () => {
    const { tagId } = useParams();

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

    const posts = value!.posts
    console.log(posts)

    const handleEditTag = async (values: UserTag) => {
      try {
        const { data } = await axios.put(
          `${apiDomain()}/tags/${tagId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      try {
        const { data } = await axios.delete(`${apiDomain()}/tags/${tagId}`);
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
          tag={tag}
          deleteButton={deleteButton}
          handleEditTag={handleEditTag}
        />
        <Stack>
          <Heading size={"xl"} textAlign={"center"} marginTop={"1rem"}>
            Posts associated with: {tag.name}
          </Heading>
          <Grid templateColumns={"repeat(auto-fit, 400px)"} gap={32}>
            {posts.map((post: any) => {
              return <PostCard {...post} />;
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
