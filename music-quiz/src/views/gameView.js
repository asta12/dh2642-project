import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

function gameView(props) {
  
  return (
    <Container>
       <Form.Check 
            type={'checkbox'}
            id={`default-'checkbox'`}
            label={"Show Lyrics"}
            onChange={() => props.onCheckClick()}
            defaultChecked={props.showLyrics}
          />
        
      <Button onClick={(e) => props.onPlayClick()}> Start Game </Button>
    </Container>
  );
}

export default gameView;
