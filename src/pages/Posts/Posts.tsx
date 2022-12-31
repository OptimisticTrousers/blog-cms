import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import useFetch from "../../hooks/useFetch";
import { FetchPosts, Post } from "../../atoms";
import CSSModules from "react-css-modules";
import styles from "./Posts.module.css";
import { Loader } from "@mantine/core";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";

const Posts = () => {
  const { loading, error, value }: FetchPosts = useFetch(
    `${apiDomain()}/posts`
  );

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const renderedPosts = value!.posts.map((post: Post) => {
    return <PostCard key={post._id} {...post} />;
  });

  return <section styleName="posts">{renderedPosts}</section>;
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
