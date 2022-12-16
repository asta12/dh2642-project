import { Button, Image, Row, Alert } from "react-bootstrap";

import { getImgSrc } from "../settings/profileSettings";

export default function SearchUserResults(props) {
  let img = getImgSrc(props.searchResult.username);
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
