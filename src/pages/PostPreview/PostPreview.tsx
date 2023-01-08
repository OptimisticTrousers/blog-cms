import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BsCalendar3 } from "react-icons/bs";
import parse from "html-react-parser";
import Date from "../../components/Date/Date";
import CSSModules from "react-css-modules";
import styles from "./PostPreview.module.css";
import { Loader } from "@mantine/core";
import { apiDomain, s3Domain } from "../../utils";
import { FetchPost } from "../../atoms";
import Error from "../../components/Error/Error";
import { Image } from "@chakra-ui/react";

const PostPreview = () => {
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

  const { title, image, caption, createdAt, updatedAt, contentHtml } =
    value!.post;

  return (
    <article styleName="preview">
      <h2 styleName="preview__title">{title}</h2>
      <figure styleName="preview__container">
        <Image
          styleName="preview__image"
          src={`${s3Domain()}/${image.originalname}`}
          boxSize="60%"
          objectFit={"contain"}
          alt={title}
        />
        <figcaption styleName="preview__caption">{caption}</figcaption>
      </figure>
      <hr />
      <p styleName="preview__date">
        <BsCalendar3 />
        <Date dateString={createdAt} />
      </p>
      <section styleName="preview__description">{parse(contentHtml)}</section>
      <p styleName="preview__date">
        <BsCalendar3 />
        <span styleName="preview__bold">Updated:</span>
        <Date dateString={updatedAt} />
      </p>
    </article>
  );
};

export default CSSModules(PostPreview, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
