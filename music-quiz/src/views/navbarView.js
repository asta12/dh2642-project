import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImgSrc } from "../settings/profileSettings";
import head from "../images/robot_head.png";

export default function navbarView(props) {
  let imgsrc = null;
  if (props.loggedInUser) {
    imgsrc = getImgSrc(props.loggedInUser);
  }

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      style={{ borderRadius: "10px" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link
              as={Link}
              to="/"
              key="home"
              className="navbar-hover"
              style={{ color: "white" }}
            >
              Home
            </Nav.Link>

            {props.loggedInUser && (
              <>
                <Nav.Link
                  as={Link}
                  to="/play"
                  key="play"
                  className="navbar-hover"
                  style={{ color: "white" }}
                >
                  Play
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  key="profile"
                  className="navbar-hover"
                  style={{ color: "white" }}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile/add-friend"
                  key="add-friend"
                  className="navbar-hover"
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
                className="d-flex navbar-hover"
                as={Link}
                to="/login"
                key="login"
                style={{ color: "white" }}
              >
                Log in
              </Nav.Link>
              <Nav.Link
                className="d-flex navbar-hover"
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
                className="navbar-hover"
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
