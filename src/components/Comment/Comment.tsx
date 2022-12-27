/* eslint-disable react/no-unknown-property */
import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./Comment.module.css";
import parse from "html-react-parser";
import Date from "../Date/Date";
import moment from "moment";
import avatar from "../../assets/images/optimistictrousers.jpg";

const Comment = ({ name, contentHtml, createdAt }: any) => {
  return (
    <article styleName="comment">
      <div styleName="comment__image-container">
        <img
          styleName="comment__image"
          src={avatar}
          alt="me"
          width={130}
          height={130}
        />
      </div>
      <div styleName="comment__container">
        <span styleName="comment__author">
          Comment by: <strong>{name}</strong>
        </span>
        <div styleName="comment__details">
          <p styleName="comment__date">
            # <Date dateString={createdAt} />
          </p>
          <div styleName="comment__block">

          around
          <p styleName="comment__fromnow">{moment(createdAt).fromNow()}</p>
          </div>
        </div>
        <section styleName="comment__content">{parse(contentHtml)}</section>
      </div>
    </article>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});