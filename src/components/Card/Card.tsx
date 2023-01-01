import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

interface Props {
  _id: string;
  name: string;
  prefix: string;
}

const Card: FC<Props> = ({ _id, name, prefix }) => {
  return (
    <Link to={`/${prefix}/${_id}`} style={{ textDecoration: "none" }}>
      <div styleName="home__card">
        <h2 styleName="home__subtitle">{name}</h2>
      </div>
    </Link>
  );
};

export default CSSModules(Card, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
