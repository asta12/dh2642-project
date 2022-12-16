import { Form, Image, Stack } from "react-bootstrap";
import { getImgSrc } from "../settings/profileSettings";

function FriendUserInfo(props) {
  let img = getImgSrc(props.username);
  return (
    <div>
      <Stack direction="horizontal">
        <h2>User's Profile</h2>
        <Image src={img} width="70" height="70" className="me-3" />{" "}
      </Stack>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder={props.username} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder={props.email} disabled />
      </Form.Group>
    </div>
  );
}

export default FriendUserInfo;
