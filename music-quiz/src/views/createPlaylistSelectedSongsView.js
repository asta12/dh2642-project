import { ListGroup, CloseButton, Stack, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CreatePlaylistSelectedSongs(props) {    
    return <div>
        <h4>Selected songs</h4>
        <ListGroup className="mb-3">
            {
                props.playlistSongs.length === 0 ?
                    "You have not selected a single song"
                    :
                    props.playlistSongs.map(song => {
                        return <ListGroup.Item key={song.id}>
                            <Stack direction="horizontal">
                                <div>{song.title} - {song.artist_names}</div>
                                <div className="ms-auto">
                                    <CloseButton onClick={(e) => props.removeSongFromPlaylist(song.id)} />
                                </div>
                            </Stack>
                        </ListGroup.Item>
                    })
            }
        </ListGroup>
        <div className="text-end">
            <Button variant="primary me-2" onClick={(e) => props.savePlaylist()}>Save</Button>
            <Link
                className="btn btn-danger"
                role="button"
                to="/profile">
                Cancel
            </Link>
        </div>
        {
            props.errorMessage ?
                <Alert variant="danger mt-3">{props.errorMessage}</Alert>
                :
                ""
        }
    </div>
}

export default CreatePlaylistSelectedSongs;