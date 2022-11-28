import { ListGroup, CloseButton, Stack } from 'react-bootstrap';

function CreatePlaylistSelectedSongs(props) {
    return <div style={{ width: '50%', float: 'right' }}>
        <h4>Selected songs</h4>
        <ListGroup>
            <ListGroup.Item><Stack direction="horizontal" gap={3}>
                <div>Ed shereen - Shape of you</div>
                <div className="ms-auto"><CloseButton /></div>
            </Stack></ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
    </div>
}

export default CreatePlaylistSelectedSongs;