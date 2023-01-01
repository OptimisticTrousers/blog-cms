// @ts-nocheck
import React, { FC } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { Post, Tag, Category } from "../../atoms";

interface handleDeleteFn {
  (): Promise<void>;
}
interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: Post | Tag | Category;
  handleDelete: handleDeleteFn;
}

const DeleteModal: FC<Props> = ({ show, setShow, data, handleDelete }) => {
  const handleClose = () => setShow(false);

  const name = data?.name ? data.name : data.title;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {name}?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ marginRight: "1rem" }}
          >
            Close
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
