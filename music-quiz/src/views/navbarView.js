import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import head from "../images/robot_head.png";

export default function navbarView(props) {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      style={{ borderRadius: "10px", height: "45px" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" key="home" style={{ color: "white" }}>
              Home
            </Nav.Link>

            {props.loggedInUser && (
              <>
                <Nav.Link
                  as={Link}
                  to="/play"
                  key="play"
                  style={{ color: "white" }}
                >
                  Play
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  key="profile"
                  style={{ color: "white" }}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile/add-friend"
                  key="add-friend"
                  style={{ color: "white" }}
                >
                  Add Friend
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {!props.loggedInUser ? (
            <>
              {" "}
              <Nav.Link
                className="d-flex"
                as={Link}
                to="/login"
                key="login"
                style={{ color: "white" }}
              >
                Log in
              </Nav.Link>
              <Nav.Link
                className="d-flex"
                as={Link}
                to="/register"
                key="register"
                style={{ color: "white" }}
              >
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              <Navbar.Text>
                {`You are logged in as: ${props.loggedInUser}`}
              </Navbar.Text>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  props.handleLogout();
                }}
                key="logout"
                style={{ color: "white" }}
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
