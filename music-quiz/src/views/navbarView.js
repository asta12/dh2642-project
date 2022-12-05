import React from "react";
import { Nav, Navbar, Container, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function navbarView(props) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" key="home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" key="profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/about" key="about">
              About
            </Nav.Link>
            {(!props.loggedInUser && [
              <Nav.Link as={Link} to="/login" key="login">
                Log in
              </Nav.Link>,
              <Nav.Link as={Link} to="/register" key="register">
                Register
              </Nav.Link>,
            ]) || (
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  props.handleLogout();
                }}
                key="logout"
              >
                Logout
              </Nav.Link>
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
