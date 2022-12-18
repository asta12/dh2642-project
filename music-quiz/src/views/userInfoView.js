import { Form, Image, Stack, Card } from "react-bootstrap";
import { getImgSrc } from "../settings/profileSettings";

function UserInfo(props) {
  let img = getImgSrc(props.username);
  return (
    <div className="d-flex" style={{ justifyContent: "center" }}>
      <Card style={{ padding: "10px", width: "25rem" }}>
        <Stack direction="horizontal">
          <h2>Profile</h2>
          <Image className="ms-auto" src={img} width="70" height="70" />{" "}
        </Stack>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder={props.username} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder={props.email} disabled />
        </Form.Group>
      </Card>
    </div>
  );
}

export default UserInfo;
