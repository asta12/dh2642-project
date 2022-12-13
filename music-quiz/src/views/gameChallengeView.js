import React from "react";
import { Row, Button } from "react-bootstrap";

function GameChallengeView(props) {
  return (
    <>
      <h1 className="text-primary text-center mt-5">Challenge</h1>
      <h4 className="text-center mt-3">You will play the playlist "{props.playlist.name}", which contains {props.playlist.songs.length} songs</h4>
      <Row className="justify-content-md-center">
        <Button
          size="lg"
          className="mt-3"
          style={{ width: "300px" }}
          onClick={(e) => props.onStartClick()}
        >
          {" "}
          Start Game{" "}
        </Button>
      </Row>
    </>
  );
}

export default GameChallengeView;
