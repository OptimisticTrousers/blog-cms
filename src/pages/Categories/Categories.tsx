import { Loader } from "@mantine/core";
import { Category, FetchCategories } from "../../atoms";
import CategoryCard from "../../components/Card/Card";
import Error from "../../components/Error/Error";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";

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

  return <section>{renderedCategories}</section>;
};

export default Categories;
