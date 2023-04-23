import { Heading } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import { FetchTags, Tag } from "../../atoms";
import Card from "../../components/Card/Card";
import Error from "../../components/Error/Error";
import useFetch from "../../hooks/useFetch";

const Tags = () => {
  const { loading, error, value }: FetchTags = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/tags`
  );

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const renderedTags = value!.tags.map((tag: Tag) => {
    return <Card key={tag._id} _id={tag._id} name={tag.name} prefix="tags" />;
  });

  return (
    <>
      <Heading fontSize={"3rem"} textAlign={"center"}>
        Tags
      </Heading>
      <section>{renderedTags}</section>
    </>
  );
};

export default Tags;
