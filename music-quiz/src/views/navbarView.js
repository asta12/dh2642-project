import React from "react";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
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
              to="/about"
              key="about"
              style={{ color: "white" }}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/play"
              key="play"
              style={{ color: "white" }}
            >
              Play
            </Nav.Link>
            {(!props.loggedInUser && [
              <Nav.Link
                as={Link}
                to="/login"
                key="login"
                style={{ color: "white" }}
              >
                Log in
              </Nav.Link>,
              <Nav.Link
                as={Link}
                to="/register"
                key="register"
                style={{ color: "white" }}
              >
                Register
              </Nav.Link>,
            ]) || (
              <>
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
                <Nav.Link
                  as={Link}
                  to="/profile/add-friend"
                  key="add-friend"
                  style={{ color: "white" }}
                >
                  Add friend
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          {props.loggedInUser
            ? `You are logged in as: ${props.loggedInUser}`
            : "You are not logged in"}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
