import { ListGroup, CloseButton, Stack, Button } from 'react-bootstrap';

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
        <div className="float-end">
            <Button variant="primary me-2">Save</Button>
            <Button variant="danger">Cancel</Button>
        </div>
    </div>
}

export default CreatePlaylistSelectedSongs;