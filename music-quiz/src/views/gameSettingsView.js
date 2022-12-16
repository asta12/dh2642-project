import React from "react";
import { Form, Row, Col, Button, Dropdown, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          <Form.Label>Singing Speed</Form.Label>
          <Form.Range
            min="0.1"
            max="2"
            step="0.1"
            defaultValue={props.currentSpeed}
            onChange={onSpeedChange}
          />
        </Col>
      </Row>

      {props.playlists.length > 0 ? (
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-playlists">
            {props.choosePlaylistText}
          </Dropdown.Toggle>
          <Dropdown.Menu>{props.playlists.map(getDropdownItem)}</Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button size="lg mb-3" as={Link} to="/profile">
          Please create a quiz to start playing!
        </Button>
      )}

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

      {props.errorMessage && (
        <Alert variant="danger mt-3">{props.errorMessage}</Alert>
      )}
    </>
  );
}

export default GameSettingsView;
