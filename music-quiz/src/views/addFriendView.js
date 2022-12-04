import { Card, Form, Button, Image } from "react-bootstrap";
import notes from "../images/notes.png";

export default function AddFriendView(props) {
  return (
    <div>
      <Card>
        <Card.Body>
          <h4>Search for user</h4>
          <Form
            className="d-flex mb-3"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              props.searchUser();
            }}
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="me-2"
              aria-label="Search"
              onChange={(e) => props.setEmail(e.target.value)}
              required
              isInvalid={!props.validEmail}
            />
            <Button variant="outline-primary me-2" type="submit">
              Search
            </Button>
            <Form.Control.Feedback type="invalid">
              Please input a valid email (example@domain.com)
            </Form.Control.Feedback>
          </Form>
          {props.searchResult && (
            <div>
              <Image src={notes} width="70" height="70" className="me-3" />
              {props.searchResult.username}
              <div className="ms-auto">
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
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
