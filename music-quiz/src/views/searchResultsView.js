import { ListGroup, Stack, Button, Image } from 'react-bootstrap';

export default
    function SearchResultsView(props) {

    return <ListGroup>
        {props.searchResults.response.hits.map((hit, index) => {
            const song = hit.result
            return <ListGroup.Item key={index}>
                <Stack direction="horizontal">
                    <Image src={song.header_image_thumbnail_url} width="70" height="70" thumbnail className='me-3' />
                    <div>{song.title} - {song.artist_names}</div>
                    <div className="ms-auto">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={(e) => props.addSongToPlaylist({ id: song.id, title: song.title, artist_names: song.artist_names })}
                            disabled={props.isSongInPlaylist(song.id)}>
                            Add
                        </Button>
                    </div>
                </Stack>
            </ListGroup.Item>
        })}
    </ListGroup>
}