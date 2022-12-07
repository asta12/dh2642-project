import { Card, Form, Button, Row, Col } from "react-bootstrap";

export default function AddFriendView(props) {
  return (
    <Row>
      <Col>
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
            className="me-2 w-50"
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
      </Col>
    </Row>
  );
}
