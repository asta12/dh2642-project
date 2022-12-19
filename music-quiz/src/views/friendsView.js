import { ListGroup, Button, Image, Modal, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImgSrc } from "../settings/profileSettings";

export default function FriendsView(props) {
  return (
    <>
      <Modal show={props.showPopup} onHide={props.togglePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select the playlist you want to challenge your friend with!
          <Dropdown className="mt-3">
            <Dropdown.Toggle>
              {props.playlist?.name ? props.playlist?.name : "Choose playlist"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.playlistOptions.length < 1 ? <Dropdown.ItemText>Please create a playlist</Dropdown.ItemText> : "" }
              
              {props.playlistOptions.map((playlist, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => props.choosePlaylist(playlist)}
                  >
                    {playlist.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!props.playlist?.name}
            onClick={() => props.challenge()}
          >
            Send challenge
          </Button>
        </Modal.Footer>
      </Modal>
      <ListGroup>
        {props.friends.map((friend, index) => {
          let img = getImgSrc(friend.username);

          return (
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
              key={index}
            >
              <div>
                <Image src={img} width="50" />
                <Link
                  to={`/friend?id=${friend.id}`}
                  onClick={() => {
                    props.expand();
                  }}
                >
                  {friend.username}
                </Link>
              </div>
              <Button
                onClick={(e) => props.togglePopup(friend)}
                size="sm"
                style={{ height: "40px" }}
              >
                Challenge
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
