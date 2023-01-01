import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import React, { ComponentType, FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FetchPost, Post, UserPost } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import PostAdmin from "../../pages/PostAdmin/PostAdmin";
import { apiDomain } from "../../utils";
import Comment from "../../components/Comment/Comment";
import Error from "../../components/Error/Error";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { Button } from "@mui/material";

const withPostEditing = (WrappedComponent: any) => {
  return () => {
    const { postId } = useParams();
    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { loading, error, value }: FetchPost = useFetch(
      `${apiDomain()}/posts/${postId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const post = value!.post;

    const handleEditPost = async (values: UserPost) => {
      for (const value of values.values()) {
        console.log(value);
      }
      try {
        const { data } = await axios.put(
          `${apiDomain()}/posts/${postId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      try {
        const { data } = await axios.delete(`${apiDomain()}/posts/${postId}`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const previewButton = (
      <Link
        to={`/posts/${postId}/preview`}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            paddingTop: "0.6rem",
            paddingBottom: "0.6rem",
            textDecoration: "none",
          }}
        >
          Preview
        </Button>
      </Link>
    );

    const deleteButton = (
      <Button
        variant="outlined"
        color="error"
        sx={{
          width: "100%",
          marginTop: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
        onClick={() => setShow(true)}
      >
        Delete
      </Button>
    );

    return (
      <>
        <WrappedComponent
          post={post}
          deleteButton={deleteButton}
          previewButton={previewButton}
          handleEditPost={handleEditPost}
        />
        <DeleteModal
          handleDelete={handleDelete}
          data={post}
          show={show}
          setShow={setShow}
        />
      </>
    );
  };
};

export default withPostEditing(PostAdmin);
