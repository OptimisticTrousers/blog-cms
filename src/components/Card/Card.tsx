import React, { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./Card.module.css";

interface Props {
  _id: string;
  name: string;
  prefix: string;
}

const Card: FC<Props> = ({ _id, name, prefix }) => {
  return (
    <a styleName="home__link home__link--category" href={`/${prefix}/${_id}`}>
      <div styleName="home__card">
        <h2 styleName="home__subtitle">{name}</h2>
      </div>
    </a>
  );
};

export default CSSModules(Card, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
