import SearchSongPresenter from "../presenters/searchSongPresenter";
import SelectedSongsPresenter from "../presenters/selectedSongsPresenter";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CreatePlaylistView(props) {
  return (
    <div>
      <div>
        <h2>Create a new playlist</h2>
        <Form.Group className="mb-3" controlId="playlistName">
          <Form.Control
            type="text"
            placeholder="Name of playlist"
            onChange={(e) => props.playlistNameChange(e.target.value)}
          />
        </Form.Group>
      </div>
      <Row>
        <Col>
          <SearchSongPresenter
            addSongToPlaylist={props.addSongToPlaylist}
            isSongInPlaylist={props.isSongInPlaylist}
            isPlaylistFull={props.isPlaylistFull}
          />
        </Col>
        <Col>
          <SelectedSongsPresenter
            playlistSongs={props.playlistSongs}
            removeSongFromPlaylist={props.removeSongFromPlaylist}
          />
          <div className="text-end">
            <Button
              variant="primary me-2"
              onClick={(e) => props.savePlaylist()}
            >
              Save
            </Button>
            <Link className="btn btn-danger" role="button" to="/profile">
              Cancel
            </Link>
          </div>
          {props.errorMessage && (
            <Alert variant="danger mt-3">{props.errorMessage}</Alert>
          )}
        </Col>
      </Row>
    </div>
  );
}
