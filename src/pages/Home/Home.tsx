import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div></div>
  )
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log"
})