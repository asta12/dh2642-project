import React from "react";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";

function GameSettingsView(props) {
  function onVolumeChange(e) {
    props.onVolumeChange(e.target.value);
  }

  function onSpeedChange(e) {
    props.onSpeedChange(e.target.value);
  }

  function getDropdownItem(playlist) {
    function onSelected() {
      props.onPlaylistSelected(playlist.id);
    }

    return (
      <Dropdown.Item as="button" key={playlist.id} onClick={onSelected}>
        {playlist.name}
      </Dropdown.Item>
    );
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

      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-playlists">
            {props.choosePlaylistText}
          </Dropdown.Toggle>
          <Dropdown.Menu>{props.playlists.map(getDropdownItem)}</Dropdown.Menu>
        </Dropdown>
      </Row>

      <Row className="justify-content-md-center">
        <Button
          size="lg"
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

export default GameSettingsView;
