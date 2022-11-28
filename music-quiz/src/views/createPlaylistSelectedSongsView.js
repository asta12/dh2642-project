import { ListGroup, CloseButton, Stack, Button } from 'react-bootstrap';

function CreatePlaylistSelectedSongs(props) {
    return <div>
        <h4>Selected songs</h4>
        <ListGroup className="mb-3">
            <ListGroup.Item><Stack direction="horizontal" gap={3}>
                <div>Ed shereen - Shape of you</div>
                <div className="ms-auto"><CloseButton /></div>
            </Stack></ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <div className="float-end">
            <Button variant="success me-2">Save</Button>
            <Button variant="danger">Cancel</Button>
        </div>
    </div>
}

export default CreatePlaylistSelectedSongs;