import React from "react";
import Card from 'react-bootstrap/Card';


function ScoreView(props) {
  return (
    <>
      <h2>
        Your Score: {props.score}/{props.maxScore}
      </h2>
      <p>{props.previousGuessText}</p>
      
      
    </>
  );
}

export default ScoreView;
