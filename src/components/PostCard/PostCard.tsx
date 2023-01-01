import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./PostCard.module.css";
import { BsCalendar3 } from "react-icons/bs";
import { Post } from "../../atoms";
import Date from "../Date/Date";
import parse from "html-react-parser";
import optimistictrousers from "../../assets/images/optimistictrousers.jpg";
import { Link } from "react-router-dom";

const PostCard: FC<Post> = ({
  _id,
  title,
  published,
  createdAt,
  updatedAt,
  contentHtml,
}) => {
  return (
    <article styleName="card">
      <p
        styleName={`card__status ${
          published ? "card__status--published" : "card__status--unpublished"
        }`}
      >
        {published ? "PUBLISHED" : "UNPUBLISHED"}
      </p>
      <img
        styleName="card__image"
        alt="stuff"
        src={optimistictrousers}
        width={400}
        height={400}
      />
      <div styleName="card__content">
        <span styleName="card__date">
          <BsCalendar3 />
          <Date dateString={createdAt} />
        </span>
        <h2 styleName="card__title">{title}</h2>
        <div styleName="card__snippet">{parse(contentHtml)}</div>
        <div>
          <span styleName="card__date">
            <span styleName="card__bold">Updated on: </span>
            <Date dateString={updatedAt} />
          </span>
        </div>
      </div>
      <Link to={`/posts/${_id}`} styleName="card__link">
        <button styleName="card__button">View Post</button>
      </Link>
    </article>
  );
};

export default CSSModules(PostCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
