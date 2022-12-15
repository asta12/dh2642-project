import React from "react";
import { Badge, Button, Row } from "react-bootstrap";
import { numSongsToGuess } from "../settings/gameSettings";
import ReactStars from "react-rating-stars-component";

function GameOverView(props) {
  return (
    <div className="mt-5">
      <h1 className="text-success text-center">Congratulations!</h1>
      <h3 className="text-center mt-3">
        Your final score{" "}
        <Badge bg="primary">
          {props.guesses.filter((guess) => guess).length} / {numSongsToGuess}
        </Badge>
      </h3>
      <Row className="mt-5">
        <h3 className="d-flex justify-content-center">Leaderboard</h3>
        <p  className="d-flex justify-content-center">Insert the leaderboardPresenter here</p>
      </Row>
      <Row className="mt-5">
        <h3 className="d-flex justify-content-center">Give this playlist a rating</h3>
        <div className="d-flex justify-content-center">
          <ReactStars
            count={5}
            value={3}
            onChange={(newRating) => props.changeRating(newRating)}
            size={52}
            activeColor="#ffd700"
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
            <Button className="me-3" onClick={() => props.saveStats()}>Save Rating</Button>
            <Button onClick={() => props.done()}>Done</Button>
        </div>
      </Row>
    </div>
  );
}

export default GameOverView;
