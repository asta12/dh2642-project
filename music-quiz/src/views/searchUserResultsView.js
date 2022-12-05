import { Button, Image, Row } from "react-bootstrap";
import notes from "../images/notes.png";

export default function SearchUserResults(props) {
  return (
    <div>
      {/*placeholder image*/}
      <Image src={notes} width="70" height="70" className="me-3" />{" "}
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
