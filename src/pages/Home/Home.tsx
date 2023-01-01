import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section styleName="home">
      <h1 styleName="home__title">Blog CMS</h1>
      <h2 styleName="home__subtitle">
        Simple, minimalistic Blog CMS built with React.js and Express.js
      </h2>
      <p styleName="home__description">
        This blog content management system(CMS) was created for my blog on my
        personal website. It includes blog posts, categories, and tags. The blog
        CMS allows for CRUD operations to be performed on each of these
        different documents.
      </p>
      <div styleName="home__container">
        <p styleName="home__try">Try Now!</p>
        <Link to="/posts">View Posts</Link>
      </div>
    </section>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
