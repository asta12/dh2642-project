import SearchSongPresenter from "../presenters/searchSongPresenter";
import SelectedSongsPresenter from "../presenters/selectedSongsPresenter";
import { Row, Col, Form, Button, Alert, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PLAYLIST_MIN_SONGS } from "../settings/playlistSettings";

export default function EditPlaylistView(props) {
  return (
    <div>
      <div>
        <Stack direction="horizontal">
        <h2>Edit playlist</h2>
          <Button
            className="ms-3"
            variant="outline-danger"
            onClick={(e) => props.deletePlaylist()}
          >
            Delete
          </Button>
        </Stack>
        <p>Select a minimum of {PLAYLIST_MIN_SONGS} songs and press the save button</p>

        <Form.Group className="mb-3" controlId="playlistName">
          <Form.Control
            type="text"
            placeholder="Name of playlist"
            onChange={(e) => props.playlistNameChange(e.target.value)}
            value={props.playlistName}
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
