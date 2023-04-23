import axios from "axios";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, redirect, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Navbar bg="light" expand="sm" className="mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Blog CMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Navigation
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" style={{ paddingLeft: "0.5rem" }}>
                Home
              </Nav.Link>
              <NavDropdown
                title="Lists"
                id={`offcanvasNavbarDropdown-expand-sm`}
                className="nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/posts">
                  All Posts
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categories">
                  All Categories
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tags">
                  All Tags
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Create"
                id={`offcanvasNavbarDropdown-expand-sm`}
                className="nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/posts/create">
                  Create Post
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categories/create">
                  Create Category
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tags/create">
                  Create Tag
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
