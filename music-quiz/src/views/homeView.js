import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function HomeView(props) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Hi and welcome to a Music Quiz with a Twist</Card.Title>
        <Card.Text>
          If you are new here, start by clicking register above to create an
          account in order to play. After creating an account, create a playlist
          by visiting the profile page.
        </Card.Text>
        <Card.Text>After that, you are ready to play!</Card.Text>

        <Button as={Link} to={props.link} variant="primary">
          Play
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomeView;
