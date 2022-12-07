import { Button } from "react-bootstrap";

function CreatePlaylistButtonView(props) {
  return (
    <div className="mt-3">
        <Button variant="primary" onClick={(e) => props.createPlaylistButtonClick()}>Create playlist</Button>
    </div>
  );
}

export default CreatePlaylistButtonView;