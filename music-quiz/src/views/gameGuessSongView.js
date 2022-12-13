import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Pagination, Badge } from "react-bootstrap";
import { numSongsToGuess } from "../settings/gameSettings";

function GameGuessSongView(props) {
  const [hasGuessed, setHasGuessed] = useState(false);
  const [infoText, setInfoText] = useState("Which song are you hearing?");
  const [infoTextStyle, setInfoTextStyle] = useState("text-primary");
  const [buttonStyles, setButtonStyles] = useState([
    "primary",
    "primary",
    "primary",
    "primary",
  ]);

  function onGuessClick(btnID) {
    if (hasGuessed) {
      return;
    }

    window.speechSynthesis.cancel();

    setButtonStyles(
      props.answers.map((answer) => (answer.correct ? "success" : "danger"))
    );

    if (props.answers[btnID].correct) {
      setInfoText("Correct!");
      setInfoTextStyle("text-success");
      props.correctGuess();
    } else {
      setInfoText("Wrong!");
      setInfoTextStyle("text-danger");
      props.wrongGuess();
    }

    setHasGuessed(true);
  }

  function getSpeechSettingsObject() {
    const u = new SpeechSynthesisUtterance();
    u.text = props.songLyrics;
    u.pitch = 1;
    u.rate = props.speed;
    u.volume = props.volume;
    u.lang = "en-US";
    return u;
  }

  function componentCreated() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(getSpeechSettingsObject());

    function onComponentTakeDown() {
      window.speechSynthesis.cancel();
    }

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  return (
    <div>
      <h1 className={`text-center mb-5 mt-5 ${infoTextStyle}`}>{infoText}</h1>
      <Row className="mb-3">
        <Col>
          <Button
            onClick={() => onGuessClick(0)}
            className="p-5"
            size="lg"
            style={{ width: "100%" }}
            variant={buttonStyles[0]}
          >
            {props.answers[0].title}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => onGuessClick(1)}
            className="p-5"
            size="lg"
            style={{ width: "100%" }}
            variant={buttonStyles[1]}
          >
            {props.answers[1].title}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => onGuessClick(2)}
            className="p-5"
            size="lg"
            style={{ width: "100%" }}
            variant={buttonStyles[2]}
          >
            {props.answers[2].title}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => onGuessClick(3)}
            className="p-5"
            size="lg"
            style={{ width: "100%" }}
            variant={buttonStyles[3]}
          >
            {props.answers[3].title}
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h4>
            Score{" "}
            <Badge bg="primary">
              {props.guesses.filter(guess => guess).length} / {numSongsToGuess}
            </Badge>
          </h4>
        </Col>
        <Col>
          <Pagination className="d-flex justify-content-center">
            {[...Array(numSongsToGuess).keys()].map((index) => {
              return (
                <Pagination.Item
                  className={
                    index < props.guesses.length
                      ? props.guesses[index]
                        ? "correct-guess"
                        : "wrong-guess"
                      : ""
                  }
                  key={index}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            onClick={() => props.nextSong()}
            disabled={!hasGuessed}
            size="lg"
          >
            {props.guesses.length < numSongsToGuess ? "Next Song" : "Game Over"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default GameGuessSongView;
