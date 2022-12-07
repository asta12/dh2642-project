import { Button, Image, Row, Alert } from "react-bootstrap";
import p1 from "../images/profile_pic_1.png";
import p2 from "../images/profile_pic_2.png";
import p3 from "../images/profile_pic_3.png";
import p4 from "../images/profile_pic_4.png";

export default function SearchUserResults(props) {
  function getProfileNumber(name) {
    let total = 0;
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return (total % 4) + 1;
  }

  let rand_img_nr = getProfileNumber(props.searchResult.username);
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
    <div>
      <Image src={img} width="70" height="70" className="me-3" />{" "}
      {props.searchResult.username}
      <div className="mt-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={(e) => props.sendFriendRequest()}
          disabled={props.isUserFriend() || props.isRequestSent()}
        >
          {props.isUserFriend()
            ? "Already friends"
            : props.isRequestSent()
            ? "Request pending.."
            : "Send friend request"}
        </Button>
      </div>
    </div>
  );
}
