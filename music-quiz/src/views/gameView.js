import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

function gameView(props) {
  return (
    <div className="d-flex mb-3 justify-content-center">
      <Stack gap={2} className="col-md-5 mx-auto">
        {/*<Form.Check
          type={"checkbox"}
          id={`default-checkbox`}
          label={"Show Lyrics"}
          onChange={() => props.onCheckClick()}
          defaultChecked={props.showLyrics}
        />*/}
        
        {/*
        <Button size="lg" style={{alignSelf:"center"}} onClick={(e) => props.onPlayClick()}>
          {" "}
          {props.playText}{" "}
        </Button>
        */}
       

        
      </Stack>
    </div>
  );
}

export default gameView;
