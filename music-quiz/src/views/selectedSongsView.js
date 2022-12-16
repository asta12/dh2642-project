import { ListGroup, CloseButton, Stack, Badge } from "react-bootstrap";

function SelectedSongsView(props) {
  return (
    <div>
      <h4>Selected songs <Badge bg="primary">{props.playlistSongs.length}</Badge></h4>
      <ListGroup className="mb-3">
        {props.playlistSongs.length === 0
          ? "You have not selected a single song"
          : props.playlistSongs.map((song) => {
              return (
                <ListGroup.Item key={song.id}>
                  <Stack direction="horizontal">
                    <div>
                      {song.title} - {song.artist_names}
                    </div>
                    <div className="ms-auto">
                      <CloseButton
                        onClick={(e) => props.removeSongFromPlaylist(song.id)}
                      />
                    </div>
                  </Stack>
                </ListGroup.Item>
              );
            })}
      </ListGroup>
    </div>
  );
}

export default SelectedSongsView;
