import { ListGroup, Button, Image, Modal, Dropdown } from "react-bootstrap";
import p1 from "../images/profile_pic_1.png";
import p2 from "../images/profile_pic_2.png";
import p3 from "../images/profile_pic_3.png";
import p4 from "../images/profile_pic_4.png";
import { Link } from "react-router-dom";

export default function FriendsView(props) {
  // This function gets a random profile picture from a name, same one every time
  function getProfileNumber(name) {
    let total = 0;
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return (total % 4) + 1;
  }

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
          let rand_img_nr = getProfileNumber(friend.username);
          let img = null;
          switch (rand_img_nr) {
            case 1:
              img = p1;
              break;
            case 2:
              img = p2;
              break;
            case 3:
              img = p3;
              break;
            case 4:
              img = p4;
              break;
          }

          return (
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
              key={index}
            >
              <div>
                <Image src={img} width="50" />
                <Link to={`/friend?id=${friend.id}`}>{friend.username}</Link>
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
