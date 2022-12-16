import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";
import { getImgSrc } from "../settings/profileSettings";

export default function navbarView(props) {
  let imgsrc = null;
  if (props.loggedInUser) {
    imgsrc = getImgSrc(props.loggedInUser);
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" key="home">
              Home
            </Nav.Link>

            {props.loggedInUser && (
              <>
                <Nav.Link as={Link} to="/play" key="play">
                  Play
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" key="profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/profile/add-friend" key="add-friend">
                  Add friend
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {!props.loggedInUser ? (
            <>
              {" "}
              <Nav.Link className="d-flex" as={Link} to="/login" key="login">
                Log in
              </Nav.Link>
              <Nav.Link
                className="d-flex"
                as={Link}
                to="/register"
                key="register"
              >
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              <Navbar.Text>{props.loggedInUser}</Navbar.Text>
              <Navbar.Brand as={Link} to="/profile">
                <img
                  style={{
                    marginLeft: "5px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  alt=""
                  src={imgsrc}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
              </Navbar.Brand>

              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  props.handleLogout();
                }}
                key="logout"
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
