import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="sm" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/">Blog CMS</Navbar.Brand>
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
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown
                title="Lists"
                id={`offcanvasNavbarDropdown-expand-sm`}
              >
                <NavDropdown.Item href="/posts">All Posts</NavDropdown.Item>
                <NavDropdown.Item href="/categories">
                  All Categories
                </NavDropdown.Item>
                <NavDropdown.Item href="/tags">All Tags</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Create"
                id={`offcanvasNavbarDropdown-expand-sm`}
              >
                <NavDropdown.Item href="/posts/create">
                  Create Post
                </NavDropdown.Item>
                <NavDropdown.Item href="/categories/create">
                  Create Category
                </NavDropdown.Item>
                <NavDropdown.Item href="/tags/create">
                  Create Tag
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
