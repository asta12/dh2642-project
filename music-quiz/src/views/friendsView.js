import { ListGroup, Badge, Button, Image } from "react-bootstrap";
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
                onClick={(e) => console.log("Challenge " + friend.username)}
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
