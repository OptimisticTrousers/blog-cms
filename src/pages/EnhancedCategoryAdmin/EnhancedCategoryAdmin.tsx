import { DeleteIcon } from "@chakra-ui/icons";
import { Button, useDisclosure, Wrap } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FetchCategory, UserCategory } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import CategoryAdmin from "../CategoriesAdmin/CategoriesAdmin";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const withCategoryEditing = (WrappedComponent: any) => {
  return () => {
    const { categoryId } = useParams();
    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { loading, error, value }: FetchCategory = useFetch(
      `${apiDomain()}/categories/${categoryId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const category = value!.category;

    const handleEditCategory = async (values: UserCategory) => {
      try {
        const { data } = await axios.put(
          `${apiDomain()}/categories/${categoryId}`,
          values
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      try {
        const { data } = await axios.delete(
          `${apiDomain()}/categories/${categoryId}`
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteButton = (
      <Button
        colorScheme={"red"}
        leftIcon={<DeleteIcon />}
        width="100%"
        borderRadius={8}
        onClick={() => setShow(true)}
        marginTop={"1rem"}
      >
        Delete
      </Button>
    );

    return (
      <>
        <WrappedComponent
          category={value!.category}
          deleteButton={deleteButton}
          handleEditCategory={handleEditCategory}
        />
        <DeleteModal
          handleDelete={handleDelete}
          show={show}
          setShow={setShow}
          data={category}
        />
      </>
    );
  };
};

export default withCategoryEditing(CategoryAdmin);
