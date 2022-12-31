import { Loader } from "@mantine/core";
import React from "react";
import CSSModules from "react-css-modules";
import { Category, FetchCategories } from "../../atoms";
import CategoryCard from "../../components/Card/Card";
import Error from "../../components/Error/Error";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";
import styles from "./Categories.module.css";

const Categories = () => {
  const { loading, error, value }: FetchCategories = useFetch(
    `${apiDomain()}/categories`
  );

  if (loading) {
    return <Loader size={"xl"} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const renderedCategories = value!.categories.map((category: Category) => {
    return (
      <CategoryCard
        key={category._id}
        _id={category._id}
        name={category.name}
        prefix="categories"
      />
    );
  });

  return <section styleName="categories">{renderedCategories}</section>;
};

export default CSSModules(Categories, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
