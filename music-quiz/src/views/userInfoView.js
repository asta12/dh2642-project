import { Form } from "react-bootstrap";

function UserInfo(props) {
  return (
    <div>
      <h2>Profile</h2>
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

export default UserInfo;
