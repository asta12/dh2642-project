import Form from 'react-bootstrap/Form';

function CreatePlaylistName(props) {
    return <div>
        <h2>Create a new playlist</h2>
        <Form.Group className="mb-3" controlId="playlistName">
            <Form.Control type="text" placeholder="Name of playlist" onChange={(e) => props.playlistNameChange(e.target.value)} />
        </Form.Group>
    </div>
}

export default CreatePlaylistName;