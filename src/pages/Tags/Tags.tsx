import { Loader } from "@mantine/core";
import React from "react";
import CSSModules from "react-css-modules";
import { FetchTags, Tag } from "../../atoms";
import Card from "../../components/Card/Card";
import Error from "../../components/Error/Error";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";
import styles from "./Tags.module.css";

const Tags = () => {
  const { loading, error, value }: FetchTags = useFetch(`${apiDomain()}/tags`);

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const renderedTags = value!.tags.map((tag: Tag) => {
    return <Card key={tag._id} _id={tag._id} name={tag.name} prefix="tags" />;
  });

  return <section styleName="tags">{renderedTags}</section>;
};

export default CSSModules(Tags, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
