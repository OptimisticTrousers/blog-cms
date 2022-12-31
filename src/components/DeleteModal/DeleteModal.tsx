import React, { FC, useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  show: boolean;
  setShow: any;
  data: any;
  handleDelete: any;
}

const DeleteModal: FC<Props> = ({ show, setShow, data, handleDelete }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        sx={{
          width: "100%",
          marginTop: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
        startIcon={<DeleteIcon />}
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {data && data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {data && data.name}?
        </Modal.Body>
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
