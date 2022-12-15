import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import ScoreboardView from "./scoreboardView.js";

const scores = [
  {
    userID: "1",
    username: "Astra",
    score: 10,
  },
  {
    userID: "2",
    username: "Astra2",
    score: 9,
  },
  {
    userID: "3",
    username: "Anna",
    score: 8,
  },
];

export default function ScoreboardPopupPresenter(props) {
  // move state to presenter when using real data
  const [showPopup, updatePopup] = useState(false);

  function togglePopup() {
    updatePopup(!showPopup);
  }

  return (
    <>
      <Modal show={showPopup} onHide={() => togglePopup()}>
        <Modal.Header closeButton>
          <Modal.Title>Scoreboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScoreboardView scores={props.playerHistory} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Button
        onClick={(e) => togglePopup()}
        size="sm"
        variant="outline-primary"
        style={{ marginRight: "10px" }}
      >
        Scoreboard
      </Button>
    </>
  );
}
