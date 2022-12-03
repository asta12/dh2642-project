import React from "react";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

function SettingsView(props) {
  function onVolumeChange(e) {
    props.onVolumeChange(e.target.value);
  }

  function onSpeedChange(e) {
    props.onSpeedChange(e.target.value);
  }

  return (
    <>
    <Row>
      <Col>
      <Form.Label>Game Volume</Form.Label>
      <Form.Range
        min="0"
        max="1"
        step="0.1"
        defaultValue={props.currentVolume}
        onChange={onVolumeChange}
      />
      </Col>
    
      
      <Col>
      <Form.Label>Game Speed</Form.Label>
      <Form.Range
        min="0.1"
        max="2"
        step="0.1"
        defaultValue={props.currentSpeed}
        onChange={onSpeedChange}
      />
      </Col>
    </Row>
    
    <Row className="justify-content-md-center">
    <Button size="lg" style={{width:"300px"}} onClick={(e) => props.onStartClick()}>
          {" "}
          Start Game{" "}
    </Button>

    </Row>
    
    </>
  );
}

export default SettingsView;
