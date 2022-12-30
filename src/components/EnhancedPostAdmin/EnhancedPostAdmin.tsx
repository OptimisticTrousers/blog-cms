import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import React, { ComponentType, FC } from "react";
import { Link, useParams } from "react-router-dom";
import { FetchPost, Post, UserPost } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import PostAdmin from "../../pages/PostAdmin/PostAdmin";
import { apiDomain } from "../../utils";
import Comment from "../Comment/Comment";
import Error from "../Error/Error";

const withFetch = (WrappedComponent: any) => {
  return () => {
    const { postId } = useParams();

    const { loading, error, value }: FetchPost = useFetch(
      `${apiDomain()}/posts/${postId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const handleEditPost = async (values: UserPost) => {
      try {
        const { data } = await axios.put(`${apiDomain()}/posts/${postId}`, values);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

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

    const previewButton = (
      <Link to={`/posts/${postId}/preview`} target="_blank">
        <Button leftIcon={<ViewIcon />}>Preview</Button>
      </Link>
    );

    const deleteButton = (
      <Button
        colorScheme={"red"}
        leftIcon={<DeleteIcon />}
        width="100%"
        borderRadius={8}
        marginTop={"1rem"}
      >
        Delete
      </Button>
    );

    return (
      <WrappedComponent
        post={value!.posts}
        deleteButton={deleteButton}
        previewButton={previewButton}
        renderedComments={renderedComments}
        handleEditPost={handleEditPost}
      />
    );
  };
};

export default withFetch(PostAdmin);
