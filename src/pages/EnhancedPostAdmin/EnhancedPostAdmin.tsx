import { Loader } from "@mantine/core";
import axios from "axios";
import { FunctionComponent, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchPost, PostAdminProps } from "../../atoms";
import useFetch from "../../hooks/useFetch";
import PostAdmin from "../../pages/PostAdmin/PostAdmin";
import { apiDomain } from "../../utils";
import Error from "../../components/Error/Error";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { Button } from "@mui/material";
import { AuthContext } from "../../App";

const withPostEditing = (
  WrappedComponent: FunctionComponent<PostAdminProps>
) => {
  return () => {
    const { postId } = useParams();

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const { loading, error, value }: FetchPost = useFetch(
      `${apiDomain()}/posts/${postId}`
    );

    if (loading) {
      return <Loader size={"xl"} />;
    }

    if (error) {
      return <Error error={error} />;
    }

    const post = value!.post;

    const handleEditPost = async (values: FormData) => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      try {
        const { data } = await axios.put(
          `${apiDomain()}/posts/${postId}`,
          values
        );
        console.log(data);
        navigate(`/posts/${data._id}`);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDelete = async () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      try {
        const { data } = await axios.delete(`${apiDomain()}/posts/${postId}`);
        console.log(data);
        navigate("/posts");
      } catch (err) {
        console.log(err);
      }
    };

    const previewButton = (
      <Link
        to={`/posts/${postId}/preview`}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            paddingTop: "0.6rem",
            paddingBottom: "0.6rem",
            textDecoration: "none",
          }}
        >
          Preview
        </Button>
      </Link>
    );

    const deleteButton = (
      <Button
        variant="contained"
        color="warning"
        sx={{
          width: "100%",
          marginTop: "1rem",
          paddingTop: "0.6rem",
          paddingBottom: "0.6rem",
          textDecoration: "none",
          borderRadius: "8px",
        }}
        onClick={() => setShow(true)}
      >
        Delete
      </Button>
    );

    return (
      <>
        <WrappedComponent
          post={post}
          deleteButton={deleteButton}
          previewButton={previewButton}
          handleEditPost={handleEditPost}
        />
        <DeleteModal
          handleDelete={handleDelete}
          data={post}
          show={show}
          setShow={setShow}
        />
      </>
    );
  };
};

export default withPostEditing(PostAdmin);
