import React from "react";
import Card from "react-bootstrap/Card";

function ScoreView(props) {
  return (
    <>
      <div className="mx-auto" style={{ width: "400px" }}>
        <Card
          text="white"
          bg={props.successStyle}
          style={{ width: "400px", height: "100px" }}
          className="text-center mt-4"
        >
          <Card.Body>
            <Card.Text>{props.previousGuessText}</Card.Text>
            <Card.Text>{props.countdown}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <h2>
        Your Score: {props.score}/{props.maxScore}
      </h2>
    </>
  );
}

export default ScoreView;
