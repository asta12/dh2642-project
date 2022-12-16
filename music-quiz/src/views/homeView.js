import React from "react";
import { Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import robot from "../images/singing_robot.png";
import note from "../images/profile_pic_3.png";
import doubleNote from "../images/profile_pic_2.png";
import notes from "../images/notes.png";

export default function HomeView(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image src={notes} width="60px" height="60px" />
      <Image src={robot} width="250px" />
      <Card
        className="text-center"
        style={{
          width: "500px",
          height: "300px",
          borderRadius: "10px",
          boxShadow: "7px 7px lightGrey",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#4682B4" }}>
            Welcome to Music Quiz with a Twist
          </Card.Title>
          <Card.Text style={{ paddingBottom: "20px" }}>
            <br />
            If you are new here, start by registering. After creating an account
            you can create quizzes on your profile page. If you get a friend to
            register as well you can challenge each other to each other's
            quizzes!
          </Card.Text>

          <Card.Text style={{ color: "#4682B4", fontSize: "20px" }}>
            <Image src={note} width="30px" />
            We hope you will have fun!
            <Image src={note} width="30px" />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
