import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../atoms";
import CSSModules from "react-css-modules";
import styles from "./Posts.module.css";
import { Loader } from "@mantine/core";

const Posts = () => {
  const { loading, error, value }: any = useFetch();

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const renderedPosts = value.posts.map((post: Post) => {
    return <PostCard {...post} />;
  });

  return <section styleName="posts">{renderedPosts}</section>;
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
