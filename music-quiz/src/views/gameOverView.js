import React from "react";
import { Badge, Button, Row } from "react-bootstrap";
import { numSongsToGuess } from "../settings/gameSettings";
import ReactStars from "react-rating-stars-component";
import ScoreboardView from "./scoreboardView.js";

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
        <ScoreboardView
          className="d-flex justify-content-center"
          scores={props.scores}
        ></ScoreboardView>
      </Row>
      <Row className="mt-5">
        <h3 className="d-flex justify-content-center">
          Give this playlist a rating
        </h3>
        <div className="d-flex justify-content-center">
          <ReactStars
            count={5}
            value={3}
            onChange={(newRating) => props.changeRating(newRating)}
            size={52}
            activeColor="#ffd700"
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button onClick={() => props.saveGame()}>Save Game</Button>
        </div>
      </Row>
    </div>
  );
}

export default GameOverView;
